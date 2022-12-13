{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent, }];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };

    const toogleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toogleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToogleDoneEvents = () => {
        const toogleDoneButtons = document.querySelectorAll(".js-done");
        toogleDoneButtons.forEach((toogleDoneButton, taskIndex) => {
            toogleDoneButton.addEventListener("click", () => {
                toogleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        const taskToHTML = (task) => `
         <li class="list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""} js-tasks >
        <button class="list__button list__button--done js-done"> 
          ${task.done ? "✓" : ""}
        </button>
        <span class="list${task.done ? " list__done" : ""}">
         ${task.content}
         </span>
        <button class="list__button list__button--remove js-remove">
          🗑
         </button>
         </li>
`;
        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.legth) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="button__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
         </button>
        <button
         class="buttons__button js-markAllDone" 
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
         Ukończ wszystkie </button>
          `;
    };



    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toogleHideDoneTasksButton = document.querySelector(".js-toogleHideDoneTasks");

        if (toogleHideDoneTasksButton) {
            toogleHideDoneTasksButton.addEventListener("click", toogleHideDoneTasks);
        }
    };

    const render = () => {

        renderTasks();
        bindRemoveEvents();
        bindToogleDoneEvents();

        renderButtons();
        bindButtonsEvents();

    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTaskElement = document.querySelector(".js-newTask");

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}