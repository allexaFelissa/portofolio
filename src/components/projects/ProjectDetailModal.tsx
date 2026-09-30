"use client";

import type { Project } from "@/content/types";
import { Modal } from "@/components/ui/Modal";

export function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return <Modal open onClose={onClose} labelledBy="project-detail-title" variant="project">
    <div className="font-sans">
      <div className="grid items-start md:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
        <div className="overflow-hidden bg-surface">
          <img
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            width={2580}
            height={1560}
            onError={event => { event.currentTarget.src = "/placeholder-project.svg"; }}
            className="aspect-[43/26] h-auto w-full object-contain"
          />
        </div>
        <div className="relative flex flex-col p-6 sm:p-8">
          <button onClick={onClose} aria-label="Close project details" className="absolute right-5 top-4 rounded-button px-2 text-2xl text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">×</button>
          <h2 id="project-detail-title" className="text-heading-black pr-10 text-2xl sm:text-3xl">{project.title}</h2>
          {project.categories?.length ? <p className="text-eyebrow mt-3">{project.categories.join(" · ")} project</p> : null}
          {project.stack?.length ? <div className="mt-7"><h3 className="text-sm font-bold text-primary">Tools</h3><div className="mt-3 flex flex-wrap gap-2">{project.stack.map(item => <span key={item} className="rounded-pill border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-primary">{item}</span>)}</div></div> : null}
          {(project.externalUrl || project.repositoryUrl || project.demoUrl) && <div className="mt-7 flex items-center gap-2 whitespace-nowrap">
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-border bg-bg px-3.5 py-2 text-xs font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><svg aria-hidden="true" viewBox="0 0 12 12" className="size-3 fill-current"><path d="M2.5 1.5 10 6l-7.5 4.5z" /></svg>Try Out</a>}
            {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-border bg-bg px-3.5 py-2 text-xs font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5 fill-none stroke-current stroke-[1.7]" strokeLinecap="round" strokeLinejoin="round"><path d="m7 5-5 5 5 5M13 5l5 5-5 5M12 3 8 17" /></svg>View GitHub</a>}
            {project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-bg shadow-sm transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5 fill-none stroke-current stroke-[1.7]" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 5.5h6l1.5 2h7.5v8.5a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 16z" /><path d="M2.5 7.5V5A1.5 1.5 0 0 1 4 3.5h4l1.5 2" /></svg>View Folder</a>}
          </div>}
        </div>
      </div>
      {(project.detailBody || project.description) && <div className="border-t border-border px-6 py-6 sm:px-8 sm:py-7"><h3 className="text-sm font-bold text-primary">Description</h3><p className="text-body mt-3 max-w-4xl text-sm leading-7">{project.detailBody ?? project.description}</p></div>}
    </div>
  </Modal>;
}
