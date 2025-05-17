import { z } from "zod";
export declare const signUpShouldBe: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const signInShouldBe: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const roomShouldBe: z.ZodObject<{
    roomName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roomName: string;
}, {
    roomName: string;
}>;
export declare const joinRoomShouldBe: z.ZodObject<{
    roomJoinCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roomJoinCode: string;
}, {
    roomJoinCode: string;
}>;
export declare const updateRoomDetailsShouldBe: z.ZodObject<{
    roomId: z.ZodString;
    roomName: z.ZodString;
    join_code: z.ZodBoolean;
    roomPic: z.ZodString;
}, "strip", z.ZodTypeAny, {
    roomName: string;
    roomId: string;
    join_code: boolean;
    roomPic: string;
}, {
    roomName: string;
    roomId: string;
    join_code: boolean;
    roomPic: string;
}>;
export type authTokenType = {
    user_id: string;
    email: string;
    name: string;
};
export declare const JWT_SECRET: string;
//# sourceMappingURL=index.d.ts.map