<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { ModeToggle } from '$lib/components/ui/mode-toggle';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	
	// Icon imports
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import CopyIcon from '@lucide/svelte/icons/copy';
	
	let currentTheme = 'default';
	let copied = false;
	
	// Subscribe to theme store
	$: currentTheme = $themeStore;
	
	// Get the registry base URL
	$: registryBaseUrl = typeof window !== 'undefined' ? window.location.origin + base : '';
	
	function switchTheme(themeId: string) {
		themeStore.setTheme(themeId);
	}
	
	// Load saved theme on mount
	onMount(() => {
		themeStore.loadTheme();
	});
	
	// Copy to clipboard functionality
	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => copied = false, 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}
	
	const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/mode-toggle.json`;
	const usageExample = `<script lang="ts">
  import { ModeToggle } from "$lib/components/ui/mode-toggle";
<\/script>

<ModeToggle />`;

	const setupExample = `// 1. Install mode-watcher dependency
npm install mode-watcher

// 2. Add ModeWatcher to your root layout (+layout.svelte)
<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
<\/script>

<ModeWatcher />
{@render children?.()}

// 3. Use ModeToggle anywhere in your app
<script lang="ts">
  import { ModeToggle } from "$lib/components/ui/mode-toggle";
<\/script>

<ModeToggle />`;
</script>

<svelte:head>
	<title>Mode Toggle Component - UI Registry</title>
	<meta name="description" content="A toggle component for switching between light and dark modes with smooth animations." />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<a href="{base}/" class="text-2xl font-bold text-foreground hover:text-primary transition-colors">
						UI Registry
					</a>
					<nav class="hidden md:flex space-x-6">
						<a href="{base}/" class="text-muted-foreground hover:text-foreground transition-colors">Home</a>
						<a href="{base}/components" class="text-muted-foreground hover:text-foreground transition-colors">Components</a>
						<a href="{base}/themes" class="text-muted-foreground hover:text-foreground transition-colors">Themes</a>
					</nav>
				</div>
				
				<!-- Theme Switcher -->
				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-2">
						<span class="text-sm text-muted-foreground">Theme:</span>
						<select 
							bind:value={currentTheme} 
							on:change={(e) => switchTheme(e.target.value)}
							class="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
						>
							{#each themes as theme}
								<option value={theme.id}>{theme.name}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Breadcrumb -->
	<div class="container mx-auto px-4 py-4">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="{base}/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="{base}/components">Components</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Mode Toggle</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<!-- Hero Section -->
	<section class="py-12 px-4">
		<div class="container mx-auto">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center space-x-2 mb-4">
					<h1 class="text-4xl md:text-5xl font-bold text-foreground">Mode Toggle</h1>
					<Badge variant="secondary">Component</Badge>
				</div>
				<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					A toggle component for switching between light and dark modes with smooth animations.
				</p>
			</div>
		</div>
	</section>

	<!-- Main Content with Tabs -->
	<section class="py-8 px-4">
		<div class="container mx-auto max-w-4xl">
			<Tabs.Root value="examples" class="w-full">
				<Tabs.List class="grid w-full grid-cols-3">
					<Tabs.Trigger value="examples">Examples</Tabs.Trigger>
					<Tabs.Trigger value="usage">Usage</Tabs.Trigger>
					<Tabs.Trigger value="api">API</Tabs.Trigger>
				</Tabs.List>
				
				<!-- Examples Tab -->
				<Tabs.Content value="examples" class="space-y-8">
					<!-- Basic Mode Toggle -->
					<Card>
						<CardHeader>
							<CardTitle>Basic Mode Toggle</CardTitle>
							<CardDescription>Simple toggle between light and dark modes</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div class="flex items-center space-x-4">
									<ModeToggle />
									<span class="text-sm text-muted-foreground">Click to toggle between light and dark modes</span>
								</div>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;ModeToggle /&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Mode Toggle in Different Contexts -->
					<Card>
						<CardHeader>
							<CardTitle>Usage in Different Contexts</CardTitle>
							<CardDescription>Mode toggle integrated in various UI patterns</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<!-- In Header -->
								<div>
									<h4 class="font-medium mb-3">In Header/Navigation</h4>
									<div class="border rounded-lg p-4 bg-muted/30">
										<div class="flex items-center justify-between">
											<div class="flex items-center space-x-4">
												<h3 class="font-semibold">App Name</h3>
												<nav class="hidden md:flex space-x-4">
													<a href="#" class="text-sm text-muted-foreground hover:text-foreground">Home</a>
													<a href="#" class="text-sm text-muted-foreground hover:text-foreground">About</a>
													<a href="#" class="text-sm text-muted-foreground hover:text-foreground">Contact</a>
												</nav>
											</div>
											<ModeToggle />
										</div>
									</div>
								</div>

								<!-- In Settings Panel -->
								<div>
									<h4 class="font-medium mb-3">In Settings Panel</h4>
									<div class="border rounded-lg p-4 space-y-4">
										<div class="flex items-center justify-between">
											<div>
												<p class="font-medium">Appearance</p>
												<p class="text-sm text-muted-foreground">Toggle between light and dark mode</p>
											</div>
											<ModeToggle />
										</div>
										<div class="flex items-center justify-between">
											<div>
												<p class="font-medium">Notifications</p>
												<p class="text-sm text-muted-foreground">Enable push notifications</p>
											</div>
											<Button variant="outline" size="sm">Configure</Button>
										</div>
									</div>
								</div>

								<!-- Floating Action -->
								<div>
									<h4 class="font-medium mb-3">As Floating Action</h4>
									<div class="relative border rounded-lg p-8 bg-muted/30">
										<p class="text-center text-muted-foreground">Content area</p>
										<div class="absolute bottom-4 right-4">
											<ModeToggle />
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<!-- Visual States -->
					<Card>
						<CardHeader>
							<CardTitle>Visual States</CardTitle>
							<CardDescription>How the toggle appears in different modes</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div class="grid md:grid-cols-2 gap-6">
									<div class="space-y-2">
										<h4 class="font-medium">Light Mode</h4>
										<div class="flex items-center space-x-2 p-3 border rounded-lg bg-white text-black">
											<SunIcon class="h-4 w-4" />
											<span class="text-sm">Light mode active</span>
										</div>
									</div>
									
									<div class="space-y-2">
										<h4 class="font-medium">Dark Mode</h4>
										<div class="flex items-center space-x-2 p-3 border rounded-lg bg-gray-900 text-white">
											<MoonIcon class="h-4 w-4" />
											<span class="text-sm">Dark mode active</span>
										</div>
									</div>
								</div>
								
								<p class="text-sm text-muted-foreground">
									The mode toggle automatically detects the current theme and displays the appropriate icon with smooth transitions.
								</p>
							</div>
						</CardContent>
					</Card>
				</Tabs.Content>

				<!-- Usage Tab -->
				<Tabs.Content value="usage" class="space-y-8">
					<!-- Installation -->
					<Card>
						<CardHeader>
							<CardTitle>Installation</CardTitle>
							<CardDescription>Add the Mode Toggle component to your project</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="relative">
								<pre class="bg-muted p-4 rounded-md border text-sm overflow-x-auto"><code>{installCommand}</code></pre>
								<Button 
									size="icon" 
									variant="outline" 
									class="absolute top-2 right-2"
									on:click={() => copyToClipboard(installCommand)}
									aria-label="Copy installation command"
								>
									{#if copied}
										<span class="text-green-500">✓</span>
									{:else}
										<CopyIcon class="h-4 w-4" />
									{/if}
								</Button>
							</div>
						</CardContent>
					</Card>

					<!-- Setup Instructions -->
					<Card>
						<CardHeader>
							<CardTitle>Setup & Usage</CardTitle>
							<CardDescription>Complete setup instructions for the Mode Toggle component</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="relative">
								<pre class="bg-muted p-4 rounded-md border text-sm overflow-x-auto"><code>{setupExample}</code></pre>
								<Button 
									size="icon" 
									variant="outline" 
									class="absolute top-2 right-2"
									on:click={() => copyToClipboard(setupExample)}
									aria-label="Copy setup example"
								>
									{#if copied}
										<span class="text-green-500">✓</span>
									{:else}
										<CopyIcon class="h-4 w-4" />
									{/if}
								</Button>
							</div>
						</CardContent>
					</Card>

					<!-- Basic Usage -->
					<Card>
						<CardHeader>
							<CardTitle>Basic Usage</CardTitle>
							<CardDescription>Simple usage after setup</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="relative">
								<pre class="bg-muted p-4 rounded-md border text-sm overflow-x-auto"><code>{usageExample}</code></pre>
								<Button 
									size="icon" 
									variant="outline" 
									class="absolute top-2 right-2"
									on:click={() => copyToClipboard(usageExample)}
									aria-label="Copy usage example"
								>
									{#if copied}
										<span class="text-green-500">✓</span>
									{:else}
										<CopyIcon class="h-4 w-4" />
									{/if}
								</Button>
							</div>
						</CardContent>
					</Card>
				</Tabs.Content>

				<!-- API Tab -->
				<Tabs.Content value="api" class="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>API Reference</CardTitle>
							<CardDescription>Available properties for the Mode Toggle component</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<!-- ModeToggle -->
								<div>
									<h4 class="text-lg font-semibold mb-3">ModeToggle</h4>
									<p class="text-sm text-muted-foreground mb-3">The main mode toggle component.</p>
									<div class="overflow-x-auto">
										<table class="w-full text-sm">
											<thead>
												<tr class="border-b">
													<th class="text-left p-2 font-medium">Prop</th>
													<th class="text-left p-2 font-medium">Type</th>
													<th class="text-left p-2 font-medium">Default</th>
													<th class="text-left p-2 font-medium">Description</th>
												</tr>
											</thead>
											<tbody class="text-muted-foreground">
												<tr>
													<td class="p-2 font-mono">class</td>
													<td class="p-2">string</td>
													<td class="p-2">""</td>
													<td class="p-2">Additional CSS classes</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<!-- Dependencies -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Dependencies</h4>
									<p class="text-sm text-muted-foreground mb-3">Required dependencies for the Mode Toggle component.</p>
									<div class="space-y-2">
										<div class="p-3 border rounded-lg">
											<p class="font-medium">mode-watcher</p>
											<p class="text-sm text-muted-foreground">Provides theme detection and switching functionality</p>
											<code class="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">npm install mode-watcher</code>
										</div>
									</div>
								</div>

								<!-- Features -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Features</h4>
									<div class="space-y-2">
										<div class="flex items-start space-x-2">
											<div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
											<div>
												<p class="font-medium">Automatic Detection</p>
												<p class="text-sm text-muted-foreground">Detects system preference and remembers user choice</p>
											</div>
										</div>
										<div class="flex items-start space-x-2">
											<div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
											<div>
												<p class="font-medium">Smooth Animations</p>
												<p class="text-sm text-muted-foreground">Animated transitions between light and dark modes</p>
											</div>
										</div>
										<div class="flex items-start space-x-2">
											<div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
											<div>
												<p class="font-medium">Accessibility</p>
												<p class="text-sm text-muted-foreground">Keyboard navigation and screen reader support</p>
											</div>
										</div>
										<div class="flex items-start space-x-2">
											<div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
											<div>
												<p class="font-medium">Persistence</p>
												<p class="text-sm text-muted-foreground">Remembers user preference across sessions</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-border py-8 px-4">
		<div class="container mx-auto text-center">
			<p class="text-muted-foreground">
				Built with ❤️ using SvelteKit and shadcn-svelte
			</p>
		</div>
	</footer>
</div>
