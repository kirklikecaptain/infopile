declare global {
  namespace App {
    interface Locals {
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
    }
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
