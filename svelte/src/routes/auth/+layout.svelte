<script>
	import { onMount } from 'svelte';
	import { statusbar } from '$lib/stores/global.store';
	import authImage from '$lib/assets/auth_background.png';

	onMount(() => {
		$statusbar.isTransparent = true;
	});
</script>

<div class="module" style:--background-image="url({authImage})">
	<div class="inside">
		<slot />
	</div>
</div>

<style>
	.module {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.module::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-image: var(--background-image);
		filter: blur(3px) brightness(0.5);
	}
	.inside {
		position: relative;
		display: grid;
	}
</style>
