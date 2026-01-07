import Link from 'next/link';
import { EngineeringTaskGroup } from '@/data';

interface EngineeringTasksProps {
  taskGroups: EngineeringTaskGroup[];
}

export function EngineeringTasks({ taskGroups }: EngineeringTasksProps) {
  return (
    <section className="border-t py-16">
      <div className="main-container">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-light text-[var(--text-primary)]">
            Typical Engineering Tasks
          </h2>
          <p className="mt-2 text-sm text-[var(--text-tertiary)]">
            射频工程常见任务与对应资源链接
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {taskGroups.map((group, index) => (
            <div key={index} className="bg-[var(--bg-secondary)] p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-lg">{group.icon}</span>
                <h3 className="text-base font-serif font-medium text-[var(--text-primary)]">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-2">
                {group.tasks.map((task, i) => (
                  <Link
                    key={i}
                    href={task.link}
                    className="block p-2 hover:bg-[var(--bg-tertiary)] transition-colors group"
                  >
                    <div className="mb-1 text-sm text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {task.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-1.5 py-0.5 bg-[var(--bg-code)] text-[var(--text-tertiary)] font-mono">
                        {task.difficulty}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
