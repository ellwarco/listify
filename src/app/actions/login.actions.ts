import { type } from '../util';
import { Action } from '@ngrx/store';

/**
 * A Hash Constant which has all types of Login Action
 * { key: type } 
 */
export const ActionTypes = {
    LOGIN:         type("Login"),
    LOGIN_SUCCESS: type("Login Success")
}

/**
 * List of all functions i.e action that can be
 * performed while logging in a user;
 */
export class LoginActions {
    /**
     * Returns an action.
     * 
     * @param provider: a string to specify the social media from which the user is logging in. E.g: 'facebook'
     * @return {Action} an Action with type 'Login' and a payload provider 
     */
    login(provider: string): Action {
        return {
            type: ActionTypes.LOGIN,
            payload: provider
        };
    }

    /**
     * Returns an Action.
     * 
     * @param loginData: Data of type any received after login a user
     * @return {Action} an Action with type 'Login Success'
     */
    loginSuccess(loginData: any): Action {
        return {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: loginData
        }
    }

}