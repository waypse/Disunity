<script>
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	export let register;
</script>

<form method="POST" action="?/register" transition:fly={{ duration: 200, y: 50, easing: backOut }}>
	<input type="text" name="username" placeholder="Username" />
	<input type="password" name="password" placeholder="Password" />
	<button formaction="?/register">register</button>
	<button on:click={() => (register = false)}>login</button>
</form>
