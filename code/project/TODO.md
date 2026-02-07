# Manage Members Persistence Fix

## Backend Changes
- [ ] Add `plan` and `assigned_trainer_id` fields to User model
- [ ] Create migration script to add columns to database
- [ ] Update `/admin/users` endpoint to return plan and assigned_trainer name
- [ ] Update `PUT /admin/users/<id>` to handle plan and assigned_trainer_id updates
- [ ] Ensure toggle status uses backend `/admin/users/<id>/status`

## Frontend Changes
- [ ] Update loadMembers to use real data from backend (plan, status from is_active, assigned_trainer)
- [ ] Fetch trainers list from backend
- [ ] Update handleEdit to send plan and assigned_trainer_id
- [ ] Update toggleStatus to call backend API instead of UI-only
- [ ] Map is_active to status: active/suspended

## Testing
- [ ] Run migration
- [ ] Test adding member
- [ ] Test editing member (plan, trainer, status)
- [ ] Test toggle status
- [ ] Test page reload persists changes
