declare global {
  function getMiniflareBindings(): Env;
  class ExecutionContext implements ExecutionContext {}
}

export {};
