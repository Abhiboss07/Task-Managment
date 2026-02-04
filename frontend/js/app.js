const API_URL = 'http://localhost:5000/api/tasks';

const taskList = document.getElementById('taskList');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
const modalTitle = document.getElementById('modalTitle');
const statusFilter = document.getElementById('statusFilter');

let tasks = [];
let isEditing = false;
let currentTaskId = null;

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

// Event Listeners
addTaskBtn.addEventListener('click', () => {
    openModal();
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
});

window.addEventListener('click', (e) => {
    if (e.target === taskModal) {
        closeModal();
    }
});

taskForm.addEventListener('submit', handleFormSubmit);

statusFilter.addEventListener('change', () => {
    fetchTasks(statusFilter.value);
});

// Fetch Tasks
async function fetchTasks(status = 'All') {
    try {
        taskList.innerHTML = '<div class="loading-spinner"></div>';

        let url = API_URL;
        if (status !== 'All') {
            url += `?status=${status}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch tasks');

        const result = await response.json();
        tasks = result.data || [];
        renderTasks(tasks);
    } catch (error) {
        showToast(error.message, 'error');
        taskList.innerHTML = '<p class="empty-state">Failed to load tasks.</p>';
    }
}

// Render Tasks
function renderTasks(tasksToRender) {
    taskList.innerHTML = '';

    if (tasksToRender.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-clipboard-list"></i>
                <p>No tasks found. Create one to get started!</p>
            </div>
        `;
        return;
    }

    tasksToRender.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';

        const statusClass = getStatusClass(task.status);
        const date = new Date(task.createdAt).toLocaleDateString();

        card.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${escapeHtml(task.title)}</h3>
                <span class="status-badge ${statusClass}">${task.status}</span>
            </div>
            <p class="task-desc">${escapeHtml(task.description || '')}</p>
            <div class="task-footer">
                <span class="task-date">Created: ${date}</span>
                <div class="task-actions">
                    <button class="icon-btn" onclick="openEditModal('${task._id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="icon-btn btn-delete" onclick="deleteTask('${task._id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        taskList.appendChild(card);
    });
}

// Handle Form Submit
async function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    const taskData = { title, description, status };

    try {
        let response;
        if (isEditing) {
            response = await fetch(`${API_URL}/${currentTaskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
        }

        if (!response.ok) throw new Error('Failed to save task');

        showToast(isEditing ? 'Task updated successfully' : 'Task created successfully', 'success');
        closeModal();
        fetchTasks(statusFilter.value);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Delete Task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete task');

        showToast('Task deleted', 'success');
        fetchTasks(statusFilter.value);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Modal Functions
function openModal() {
    isEditing = false;
    currentTaskId = null;
    modalTitle.textContent = 'Create New Task';
    taskForm.reset();
    document.getElementById('status').value = 'Pending';
    taskModal.classList.add('show');
}

function openEditModal(id) {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    isEditing = true;
    currentTaskId = id;
    modalTitle.textContent = 'Edit Task';

    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description || '';
    document.getElementById('status').value = task.status;

    taskModal.classList.add('show');
}

function closeModal() {
    taskModal.classList.remove('show');
}

// Utility
function showToast(msg, type) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast ${type} show`;

    // Add icon
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fa-solid fa-check-circle' : 'fa-solid fa-exclamation-circle';
    toast.prepend(icon);

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function getStatusClass(status) {
    switch (status) {
        case 'Pending': return 'status-pending';
        case 'In Progress': return 'status-progress';
        case 'Completed': return 'status-completed';
        default: return '';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Expose functions to window for inline onclick handlers
window.deleteTask = deleteTask;
window.openEditModal = openEditModal;
