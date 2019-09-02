<svelte:head>
	<title>Sign in</title>
</svelte:head>

<h1>Sign In</h1>
<p><a href="/register">Need an account?</a></p>
<p><a href="/reset">Forgotten?</a></p>

<Error {error} />

<!-- <form on:submit|preventDefault='{submit}'>
    <input type="email" placeholder="Email" bind:value={username}>
    <input type="password" placeholder="Password" bind:value={password}>
    <button type="submit" disabled='{!username || !password}'>Sign in</button>
</form> -->

<form on:submit|preventDefault='{submit}'>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="email" bind:value={username} aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" bind:value={password} placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

<script>

	import { goto, stores } from '@sapper/app';
    import { auth } from '../library/auth.js';
    import Error from '../components/Error.svelte';

    const { session } = stores();

    let username = '';
    let password = '';
    let error = false;

    async function submit(event) {

        const user = await auth.login({ username, password });

        if (user.email === username) {
            $session.user = user;
            $session.token = user.token;
            goto('/');
        }
        else {
            error = response.message;
        }
    }
</script>