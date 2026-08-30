# Microsoft Graph implementation notes

These notes constrain a future connected adapter. They are not permission to
connect to or modify a real tenant.

## Current official API findings

- Disabling sign-in is an update to the user's `accountEnabled` property. The
  documented least-privileged application permission combination is
  `User.EnableDisableAccount.All` plus `User.Read.All`.
  [Microsoft: update user](https://learn.microsoft.com/en-us/graph/api/user-update?view=graph-rest-1.0)
- Session revocation resets the user's sign-in-session validity timestamp, but
  Microsoft warns that tokens may take a few minutes to be revoked. Evidence
  must distinguish API acceptance from global effect.
  [Microsoft: revokeSignInSessions](https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions?view=graph-rest-1.0)
- Direct licenses can be removed with `POST
  /users/{id}/assignLicense`, passing SKU IDs in `removeLicenses`.
  [Microsoft: assignLicense](https://learn.microsoft.com/en-us/graph/api/user-assignlicense?view=graph-rest-1.0)
- Group membership removal must target `/members/{id}/$ref`. Omitting `/$ref`
  can delete the directory object when the app also has sufficient user-write
  permission. Dynamic group memberships cannot be removed through this action.
  [Microsoft: remove member](https://learn.microsoft.com/en-us/graph/api/group-delete-members?view=graph-rest-1.0)
- Graph can return `429` and a `Retry-After` header. The adapter must respect
  that value; immediate retries continue to consume limits.
  [Microsoft: throttling guidance](https://learn.microsoft.com/en-us/graph/throttling)
- Microsoft recommends requesting only the least-privileged permissions needed.
  Admin consent is required for the sensitive application permissions involved
  in these operations.
  [Microsoft: permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference)

## Design implications

1. Use stable `v1.0` endpoints in production; never silently fall back to beta.
2. Keep group removal and user deletion in different code paths and credentials.
   The MVP must not possess user-deletion capability.
3. Discover direct versus inherited/group-based licensing before planning removal.
4. Preserve protected, dynamic, and role-assignable groups unless a separately
   approved policy says otherwise.
5. Store provider request IDs and safe response metadata, never bearer tokens.
6. Treat provider success as acceptance; verify readable postconditions.
7. Model session revocation as `accepted_pending_effect` unless a reliable
   provider-supported verification signal is established.

