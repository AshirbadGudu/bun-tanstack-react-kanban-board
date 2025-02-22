# React Kanban Board Project

This project is a simple, interactive Kanban board built using React. It allows users to manage tasks across different stages (e.g., To Do, In Progress, Done). This README outlines the project's features, how to set it up, and how to use it.

## Features

- **Drag and Drop:** Tasks can be easily dragged and dropped between columns with smooth animations and visual feedback.
- **Task Management:**
  - Add new tasks with title and description
  - Edit existing tasks through a convenient menu
  - Delete tasks with confirmation
  - Reorder tasks within columns
- **Local Storage Persistence:** All changes are automatically saved to local storage.
- **Responsive Design:** Fully responsive layout that works on all devices.
- **Modern UI:** Material UI components with custom theming and animations.

## Technologies Used

- **React 19**: Core library with latest features
- **Bun**: Fast all-in-one JavaScript runtime & package manager
- **TanStack Router**: Type-safe routing solution
- **Material UI**: Modern React UI library
- **@dnd-kit**: Drag and drop library
- **Zustand**: State management with persistence
- **TypeScript**: Type safety and better developer experience

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/tanstack-react-kanban-board.git
   cd tanstack-react-kanban-board
   ```

2. **Install Dependencies:**

   ```bash
   bun install
   ```

3. **Start Development Server:**
   ```bash
   bun dev  # Starts the development server
   ```

## Project Structure

````
src/
├── components/
│   └── kanban/
│       ├── KanbanBoard.tsx    # Main board component
│       ├── Column.tsx         # Column component
│       └── TaskCard.tsx       # Task card component with drag & drop
├── store/
│   └── kanbanStore.ts         # Zustand store with persistence
├── types/
│   └── kanban.ts             # TypeScript interfaces
├── theme/
│   └── index.ts              # Material UI theme configuration
├── routes/
│   ├── __root.tsx           # Root layout with navigation
│   ├── index.tsx            # Home page
│   └── about.tsx            # About page
├── main.tsx                 # Application entry
└── routeTree.gen.ts         # Auto-generated routes

## How to Use

1. **Adding a Task:**
   - Click the "Add Task" button in any column
   - Fill in the task title (required) and description (optional)
   - Click "Add Task" to save

2. **Editing a Task:**
   - Click the three-dot menu on any task
   - Select "Edit" from the menu
   - Modify the task details
   - Click "Save Changes"

3. **Deleting a Task:**
   - Click the three-dot menu on any task
   - Select "Delete" from the menu

4. **Moving Tasks:**
   - Drag a task using the drag handle (≡) on the left
   - Drop it in any column or between other tasks
   - Tasks can be reordered within the same column

## Development Commands

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run typecheck
````

## Future Enhancements

- **Task Features:**

  - Due dates and reminders
  - Priority levels
  - Labels and tags
  - Attachments
  - Comments/notes

- **Board Features:**

  - Multiple boards
  - Column customization
  - Board templates
  - Search and filtering
  - Task statistics

- **Collaboration:**
  - User authentication
  - Shared boards
  - Real-time updates
  - Activity history

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.
