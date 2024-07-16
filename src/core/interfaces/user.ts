/**
 * 登录用户
 */
export interface User {
    sub: string;
    email_verified: Boolean;
    phone_number_verified: Boolean;
    preferred_username: string;
    picture: string;
    updated_at: string;
    nickname: string;
    phone_number: string;
    email: string;
}
/**
 * 登录授权
 */
export interface Authorize {
    access_token: string;
    refresh_token: string;
    scope: string;
    id_token: string;
    token_type: string;
    expires_in: Number;
}