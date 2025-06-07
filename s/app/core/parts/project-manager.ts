
import {Kv} from "@e280/kv"
import {MapG} from "@e280/stz"
import {Cellar} from "@e280/quay"
import {signal, Signal} from "@benev/slate"
import {Project, ProjectPickle} from "./project.js"

export type ProjectManagerPersistence = {
	kv: Kv
	cellar: Cellar
}

export class ProjectManager {
	project: Signal<Project>
	projects: Signal<MapG<string, Project>>

	constructor(
			private persistence: ProjectManagerPersistence,
			project: Project,
			projects: MapG<string, Project>,
		) {
		this.project = signal(project)
		this.projects = signal(projects)
	}

	static async setup(persistence: ProjectManagerPersistence) {
		const {project, projects} = await this.load(persistence)
		return new this(persistence, project, projects)
	}

	static async load({kv, cellar}: ProjectManagerPersistence) {
		const projects = new MapG<string, Project>()
		const projectsKv = kv.namespace<ProjectPickle>("projects")

		// load all projects
		for await (const [id, pickle] of projectsKv.entries()) {
			const store = projectsKv.store(id)
			const project = await Project.load(store, cellar, pickle)
			projects.set(id, project)
			console.log("found project", project)
		}

		// create a new project, if none exist
		if (projects.size === 0) {
			const project = await Project.create(kv, cellar)
			projects.set(project.id, project)
			console.log("no project, created", project)
		}

		// figure out the active project id
		const activeProjectId = (await kv.get<string>("activeProjectId"))
			?? [...projects.keys()].at(0)!

		// obtain the active project
		const project = projects.require(activeProjectId)

		// save data
		await kv.set("activeProjectId", activeProjectId)
		await projectsKv.sets(
			...[...projects.entries()]
				.map(([key, project]) => [key, project.pickle()] as [string, ProjectPickle])
		)

		console.log("active project", project)

		return {project, projects}
	}

	async reload() {
		const {project, projects} = await ProjectManager.load(this.persistence)
		this.project.value = project
		this.projects.value = projects
	}

	async switchProject(id: string) {
		const project = this.projects.value.require(id)
		await this.persistence.kv.set("activeProjectId", id)
		this.project.value = project
	}
}

