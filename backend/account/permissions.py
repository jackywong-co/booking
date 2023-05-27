from rest_framework import permissions


# View Action:
# list
# create
# retrieve
# update
# partial_update
# destroy

# Comment Permission Given
# AllowAny
# IsAuthenticated
# IsAdminUser (check user.is_staff)


class PublicCreateAdminAll(permissions.BasePermission):

    # incoming requests permission
    def has_permission(self, request, view):
        # for admin all
        if request.user.is_staff:
            return True
        else:
            # for public create
            if request.method == 'POST':
                return True
            if request.method == 'GET':
                return True
            else:
                return False


class OwnerRetrieveAdminList(permissions.BasePermission):

    # object-level permissions
    def has_permission(self, request, view):
        # for admin
        if request.user.is_staff:
            return True

        # Instance must have an attribute named `user`
        # In this case "Vendor" have "user" model attribute
        else:
            if view.action == 'retrieve':
                return True
            else:
                return False


class IsOwner(permissions.BasePermission):
    """
    Only owner can view the own record or download the own file
    """

    def has_object_permission(self, request, view, obj):

        # print('request:', request.user.username)
        # print('obj:', obj.username)

        if obj == request.user:
            return True
        else:
            return False


class SuperAdminOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
