<script>
	import { statusbar } from '$lib/stores/global.store';

	const minimize = () => {
		window.electronApi.minimize();
	};

	const maximize = () => {
		window.electronApi.maximize();
	};

	const close = () => {
		window.electronApi.hide();
	};
</script>

<div class="app">
	<div class="dragbar" class:isTransparent={$statusbar.isTransparent}>
		<div style:color="gray" style="padding: 0 10px;">Disunity</div>
		<div class="window-modifiers">
			<button class="minify btn" on:click={minimize}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					width="18px"
					height="18px"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M19 13H5v-2h14v2z" />
				</svg>
			</button>
			<button class="fullscreen btn" on:click={maximize}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					width="18px"
					height="18px"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M4 8h16v2H4zm0 4h10v2H4zm0 4h10v2H4zm12-8h4v2h-4zm0 4h4v2h-4z" />
				</svg>
			</button>
			<button class="close-window btn" on:click={close}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					width="18px"
					height="18px"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					/>
				</svg>
			</button>
		</div>
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.isTransparent {
		background-color: transparent !important;
	}
	.app {
		height: calc(100vh - 20px);
	}
	.content {
		height: 100%;
		margin-top: 20px;
	}
	.dragbar {
		top: 0;
		-webkit-app-region: drag;
		position: fixed;
		z-index: 100;
		height: 20px;
		width: 100%;
		background-color: rgb(29, 29, 29);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		box-sizing: border-box;
		margin-bottom: 20px;
	}
	button {
		background-color: transparent;
	}
	button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
	button:active,
	button:focus {
		border: none;
		outline: none;
	}
	.close-window:hover {
		background-color: rgba(255, 0, 0, 0.5);
	}
	svg {
		fill: white;
	}
</style>
