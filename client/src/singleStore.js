import { writable } from "svelte/store"
import { browser } from "$app/env"

export const gas = writable(
    browser && (localStorage.getItem("gas") || "0"))
    
gas.subscribe((val) => browser && localStorage.setItem("gas", val))