﻿using Blogio.Features.Permissions;
using Blogio.Features.Roles;

namespace Blogio.Features.RolePermissions
{
    public class RolePermission
    {
        public Guid RoleId { get; set; }
        public Guid PermissionId { get; set; }

        public Role Role { get; set; }
        public Permission Permission { get; set; }
    }
}
