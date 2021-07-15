/*
  ? Effects create plain objects - Redux Saga interprets them and executes processes.
  * Take, TakeEvery, and TakeLatest wait for a specific kind of action to create
  * a new process
  ? Call, Fork, and Spawn create different kind of new processes
  * Forked processes are cancelled when their parent is cancelled or errors
  ? Take and Call pause the execution of caller processes
*/
