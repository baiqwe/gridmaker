import * as Kanban from '@/components/kanban/kanban';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { messages } from '@/messages';
import { IconGripVertical } from '@tabler/icons-react';
import * as React from 'react';

const m = messages.roadmap;

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  description?: string;
  assignee?: string;
  dueDate?: string;
}

const DEFAULT_COLUMNS: Record<string, Task[]> = {
  backlog: [
    {
      id: '1',
      title: 'Add authentication',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2026-04-01',
    },
    {
      id: '2',
      title: 'Create API endpoints',
      priority: 'medium',
      assignee: 'Jane Smith',
      dueDate: '2026-04-05',
    },
    {
      id: '3',
      title: 'Write documentation',
      priority: 'low',
      assignee: 'Bob Johnson',
      dueDate: '2026-04-10',
    },
  ],
  inProgress: [
    {
      id: '4',
      title: 'Design system updates',
      priority: 'high',
      assignee: 'Alice Brown',
      dueDate: '2026-03-28',
    },
    {
      id: '5',
      title: 'Implement dark mode',
      priority: 'medium',
      assignee: 'Charlie Wilson',
      dueDate: '2026-04-02',
    },
  ],
  done: [
    {
      id: '7',
      title: 'Setup project',
      priority: 'high',
      assignee: 'Eve Davis',
      dueDate: '2026-03-25',
    },
    {
      id: '8',
      title: 'Initial commit',
      priority: 'low',
      assignee: 'Frank White',
      dueDate: '2026-03-24',
    },
  ],
};

export function Roadmap() {
  const [columns, setColumns] =
    React.useState<Record<string, Task[]>>(DEFAULT_COLUMNS);
  const columnTitles = m.columns;

  return (
    <Kanban.Root
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
    >
      <Kanban.Board className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn
            key={columnValue}
            value={columnValue}
            tasks={tasks}
            title={
              columnTitles[columnValue as keyof typeof columnTitles] ??
              columnValue
            }
          />
        ))}
      </Kanban.Board>
      <Kanban.Overlay>
        {({ value, variant }) => {
          if (variant === 'column') {
            const tasks = columns[value] ?? [];
            return (
              <TaskColumn
                value={value}
                tasks={tasks}
                title={
                  columnTitles[value as keyof typeof columnTitles] ?? value
                }
              />
            );
          }

          const task = Object.values(columns)
            .flat()
            .find((t) => t.id === value);

          if (!task) return null;

          return <TaskCard task={task} />;
        }}
      </Kanban.Overlay>
    </Kanban.Root>
  );
}

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof Kanban.Item>, 'value'> {
  task: Task;
}

function TaskCard({ task, ...props }: TaskCardProps) {
  return (
    <Kanban.Item key={task.id} value={task.id} asChild {...props}>
      <div className="rounded-md border bg-card p-3 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 font-medium text-sm">
              {task.title}
            </span>
            <Badge
              variant={
                task.priority === 'high'
                  ? 'destructive'
                  : task.priority === 'medium'
                    ? 'default'
                    : 'secondary'
              }
              className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
            >
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-primary/20" />
                <span className="line-clamp-1">{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <time className="text-[10px] tabular-nums">{task.dueDate}</time>
            )}
          </div>
        </div>
      </div>
    </Kanban.Item>
  );
}

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof Kanban.Column>, 'children'> {
  tasks: Task[];
  title: string;
}

function TaskColumn({ value, tasks, title, ...props }: TaskColumnProps) {
  return (
    <Kanban.Column value={value} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{title}</span>
          <Badge variant="secondary" className="pointer-events-none rounded-sm">
            {tasks.length}
          </Badge>
        </div>
        <Kanban.ColumnHandle asChild>
          <Button variant="ghost" size="icon">
            <IconGripVertical className="size-4" />
          </Button>
        </Kanban.ColumnHandle>
      </div>
      <div className="flex flex-col gap-2 p-0.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle />
        ))}
      </div>
    </Kanban.Column>
  );
}
