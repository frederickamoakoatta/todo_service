// src/utils/mocks.mjs
export const getMockTodos = (userId) => {
    console.log('[INFO] Using mock todo data for local development');
    return [
      {
        task_id: 'task-123',
        user_id: userId,
        is_completed: false,
        tasks: 'Deploy SAM application'
      },
      {
        task_id: 'task-456',
        user_id: userId,
        is_completed: true,
        tasks: 'Configure Express with Lambda'
      }
    ];
  };
  
  export const getMockTodo = (userId, taskId) => {
    const todos = getMockTodos(userId);
    return todos.filter(todo => todo.task_id === taskId);
  };