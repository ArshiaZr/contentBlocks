// Desc: This file contains all the atoms that are used in the application

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const usernameAtom = atom("");
export const emailAtom = atom("");
export const passwordAtom = atom("");
export const errorMessageAtom = atom({});
export const confirmPasswordAtom = atom("");
export const isAuthenticatedAtom = atomWithStorage("isAuth", false);
export const userAtom = atomWithStorage("user", {});
export const loadingAtom = atom(false);
