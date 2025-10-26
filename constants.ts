// Fix: Replaced placeholder content with actual constant definitions.
import { Role } from './types';

// TODO: Replace with your actual API base URL
export const API_BASE_URL = '/api';

interface SidebarLink {
  name: string;
  path: string;
  icon: string;
}

export const SIDEBAR_LINKS: Record<Role, SidebarLink[]> = {
  [Role.Admin]: [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ],
  [Role.Teacher]: [
    { name: 'Dashboard', path: '/teacher', icon: '👩‍🏫' },
    { name: 'My Students', path: '/teacher/students', icon: '🎓' },
    { name: 'Assignments', path: '/teacher/assignments', icon: '📝' },
    { name: 'Grades', path: '/teacher/grades', icon: '💯' },
  ],
  [Role.Student]: [
    { name: 'Dashboard', path: '/student', icon: '🎓' },
    { name: 'My Courses', path: '/student/courses', icon: '📚' },
    { name: 'Assignments', path: '/student/assignments', icon: '📝' },
    { name: 'Grades', path: '/student/grades', icon: '💯' },
  ],
  [Role.Parent]: [
    { name: 'Dashboard', path: '/parent', icon: '👨‍👩‍👧' },
    { name: 'My Child', path: '/parent/child', icon: '👶' },
    { name: 'Reports', path: '/parent/reports', icon: '📈' },
  ],
};
