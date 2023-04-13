<script>
	import default_profile from '$lib/assets/profile-user.png';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;
	export let image;
</script>

<div class="main-header">
	<div class="profile">
		<div class="picture" style:grid-area="picture">
			<img src={image ? image : default_profile} alt="profile" />
		</div>
		<div class="name" style:grid-area="name">{data.name ? data.name : 'Waypse'}</div>
		<div class="username" style:grid-area="username">
			@{data.username ? data.username : 'johndoe'}
		</div>
	</div>
	<div class="divider" />
	<div class="home">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			on:click={() => ($page.route.id !== '/home' ? goto('/home') : null)}
			class="svg-icon"
			style="width: 40px; height: 40px;vertical-align: middle;fill: currentColor;overflow: hidden;"
			viewBox="0 0 1024 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M418.144 639.168h166.976a94.016 94.016 0 0 1 93.92 93.952v156.544c0 17.248 14.08 31.296 31.328 31.296h166.976a31.36 31.36 0 0 0 31.296-31.296V480.128a31.264 31.264 0 0 0-10.912-23.776L522.016 134.336a31.104 31.104 0 0 0-40.768 0L105.568 456.32a31.2 31.2 0 0 0-10.944 23.776v409.536a31.36 31.36 0 0 0 31.296 31.296h167.008a31.36 31.36 0 0 0 31.296-31.296V733.12a94.048 94.048 0 0 1 93.92-93.952z m459.2 344.416h-166.976a94.016 94.016 0 0 1-93.92-93.92V733.12a31.36 31.36 0 0 0-31.328-31.36h-166.976a31.36 31.36 0 0 0-31.296 31.36v156.544a94.048 94.048 0 0 1-93.92 93.92H125.92A94.048 94.048 0 0 1 32 889.664V480.128c0-27.456 11.968-53.472 32.8-71.36L440.512 86.816a93.44 93.44 0 0 1 122.272 0l375.712 322.016a93.888 93.888 0 0 1 32.768 71.328v409.536a94.016 94.016 0 0 1-93.92 93.92z"
			/>
		</svg>
	</div>
	<div class="divider" />
	<div class="guilds" />
</div>

<style>
	.home {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 20px;
		border-radius: 50%;
		transition: 0.1s ease;
	}
	.home:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
	div * {
		font-family: 'Poppins';
		color: white;
	}
	.name {
		align-self: flex-end;
		font-weight: 600;
		color: var(--white);
	}
	.username {
		align-self: flex-start;
		font-weight: 400;
		color: #cdcdcd;
	}
	.picture {
		background-color: white;
		border-radius: 50%;
		height: 40px;
		width: 40px;
	}
	img {
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}
	.profile {
		transition: 0.1s ease;
		border-radius: 100px;
		column-gap: 10px;
		box-sizing: border-box;
		padding: 0 25px;
		align-items: center;
		display: grid;
		grid-template-columns: 40px 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			'picture name'
			'picture username';
	}
	.profile:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
	.main-header {
		height: min-content;
		width: 100%;
		display: grid;
		grid-template-columns: min-content min-content min-content min-content 1fr;
		border-bottom: 1px solid rgba(255, 255, 255, 0.404);
	}
	.main-header > div {
		margin: 0 10px;
	}
	.divider {
		align-self: center;
		background-color: rgba(255, 255, 255, 0.404);
		width: 1px;
		height: 80%;
	}
</style>
