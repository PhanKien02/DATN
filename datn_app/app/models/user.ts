import {Instance, SnapshotOut, types} from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
    .model('User')
    .props({
        email: types.optional(types.string, ''),

        activated: types.optional(types.boolean, true),

        password: types.optional(types.string, ''),

        fullName: types.optional(types.string, ''),

        gender: types.maybeNull(types.boolean),

        phone: types.maybeNull(types.string),

        dob: types.maybeNull(types.Date),

        avatar: types.maybeNull(types.string),

        wardId: types.maybeNull(types.number),

        roleName: types.maybeNull(types.string),

        fcmId: types.maybeNull(types.string),
    })
    .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
    .actions(self => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type UserType = Instance<typeof UserModel>;
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {});
