# React Kanban Board Project

This project is a simple, interactive Kanban board built using React. It allows users to manage tasks across different stages (e.g., To Do, In Progress, Done). This README outlines the project's features, how to set it up, and how to use it.

## Features

- **Drag and Drop:** Tasks can be easily dragged and dropped between columns to reflect their progress. This provides a visual and intuitive way to manage workflow.

- **Add New Tasks:** Users can add new tasks to any column. A simple form is provided for inputting the task title.

- **Edit Existing Tasks:** Tasks can be edited to update their titles. Double-clicking a task opens an edit mode.

- **Delete Tasks:** Tasks can be deleted if they are no longer needed. A delete button is provided for each task.

- **Local Storage Persistence:** The state of the Kanban board (tasks and their positions) is saved to local storage. This means that your progress is preserved even if you close the browser window or refresh the page.

- **Responsive Design:** The board adapts to different screen sizes, ensuring a good user experience on desktops, tablets, and mobile devices.

- **Customizable Columns:** The project is structured in a way that makes it relatively easy to add, remove, or customize the columns (e.g., adding a "Blocked" column).

## Technologies Used

- **React 19**: Core library with latest features
- **Vite**: Build tool and dev server
- **TanStack Router**: Type-safe routing solution
- **Tailwind CSS**: Styling (currently via CDN)

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/tanstack-react-kanban-board.git
   cd tanstack-react-kanban-board
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev  # Starts Vite on port 3001
   ```

## How to Use

1.  **Adding a Task:**

    - Click the "Add Task" button at the bottom of a column.
    - Enter the task title in the input field.
    - Press Enter or click outside the input field to save the task.

2.  **Editing a Task:**

    - Double-click on the task you want to edit.
    - Modify the task title in the input field.
    - Press Enter or click outside the input field to save the changes.

3.  **Deleting a Task:**

    - Hover over the task you want to delete.
    - Click the "x" (delete) button that appears.

4.  **Moving a Task:**
    - Click and hold the task you want to move.
    - Drag the task to the desired column.
    - Release the mouse button to drop the task.

## Project Structure

```
src/
├── components/
│   ├── Board.js          // Main Kanban board component
│   ├── Column.js         // Component for individual columns
│   ├── Task.js           // Component for individual tasks
│   ├── AddTask.js       // Component for adding new tasks
│   └── EditTask.js       // Component for editing tasks
├── routes/
│   ├── __root.tsx     # Layout with navigation
│   ├── index.tsx      # Home page
│   └── about.tsx      # About page
├── main.tsx           # Application entry
├── routeTree.gen.ts   # Auto-generated routes
└── ...
```

## Future Enhancements (Optional)

- **Backend Integration:** Connect the Kanban board to a backend API to persist data in a database and enable collaboration.
- **User Authentication:** Implement user authentication to allow multiple users to have their own boards.
- **Task Details:** Add the ability to expand tasks to view or edit more details (e.g., description, due date, assigned user).
- **Search/Filtering:** Implement search or filtering functionality to easily find tasks.
- **Swimlanes:** Add support for swimlanes to further categorize tasks within columns.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
