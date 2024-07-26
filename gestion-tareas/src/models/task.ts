class Task{
    id: string;
    name: string;
    description: string;
    date: string;
    status: string;

    constructor( id:string, name: string, description: string, date:string, status: string){
        this.id = id;
        this.name = name;       
        this.description = description;
        this.date = date;
        this.status = status;
    }
}

class TaskModel{
    private tasks: Task[] = [];

    addTask(task: Task): void{
        this.tasks.push(task);
    }

    getTasks(): Task[]{
        return this.tasks;
    }
}

export {Task, TaskModel};