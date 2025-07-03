<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	
	// Icon imports
	import DownloadIcon from '@lucide/svelte/icons/download';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import MailIcon from '@lucide/svelte/icons/mail';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import LoaderIcon from '@lucide/svelte/icons/loader';
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
	
	const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/button.json`;
	const usageExample = `<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import DownloadIcon from "@lucide/svelte/icons/download";
<\/script>

<Button>Click me</Button>
<Button variant="outline" icon={DownloadIcon}>Download</Button>`;
</script>

<svelte:head>
	<title>Button Component - UI Registry</title>
	<meta name="description" content="A versatile button component with multiple variants, sizes, and icon support. Perfect for any UI design system." />
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
					<Breadcrumb.Page>Button</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<!-- Hero Section -->
	<section class="py-12 px-4">
		<div class="container mx-auto">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center space-x-2 mb-4">
					<h1 class="text-4xl md:text-5xl font-bold text-foreground">Button</h1>
					<Badge variant="secondary">Component</Badge>
				</div>
				<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					A versatile button component with multiple variants, sizes, and icon support.
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
					<!-- Button Variants -->
					<Card>
						<CardHeader>
							<CardTitle>Variants</CardTitle>
							<CardDescription>Six different visual styles for different use cases</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="grid md:grid-cols-2 gap-6">
								<!-- Default Variant -->
								<div>
									<h4 class="font-medium mb-3">Default</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Button>Default Button</Button>
										<Button icon={DownloadIcon}>With Icon</Button>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button&gt;Default Button&lt;/Button&gt;</code></pre>
								</div>

								<!-- Secondary Variant -->
								<div>
									<h4 class="font-medium mb-3">Secondary</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Button variant="secondary">Secondary</Button>
										<Button variant="secondary" icon={HeartIcon}>With Icon</Button>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button variant="secondary"&gt;Secondary&lt;/Button&gt;</code></pre>
								</div>

								<!-- Outline Variant -->
								<div>
									<h4 class="font-medium mb-3">Outline</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Button variant="outline">Outline</Button>
										<Button variant="outline" icon={MailIcon}>With Icon</Button>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button variant="outline"&gt;Outline&lt;/Button&gt;</code></pre>
								</div>

								<!-- Destructive Variant -->
								<div>
									<h4 class="font-medium mb-3">Destructive</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Button variant="destructive">Delete</Button>
										<Button variant="destructive" icon={TrashIcon}>Delete Item</Button>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button variant="destructive"&gt;Delete&lt;/Button&gt;</code></pre>
								</div>

								<!-- Ghost Variant -->
								<div>
									<h4 class="font-medium mb-3">Ghost</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Button variant="ghost">Ghost</Button>
										<Button variant="ghost" icon={PlusIcon}>Add Item</Button>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button variant="ghost"&gt;Ghost&lt;/Button&gt;</code></pre>
								</div>

								<!-- Link Variant -->
								<div>
									<h4 class="font-medium mb-3">Link</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Button variant="link">Link Button</Button>
										<Button variant="link" icon={ExternalLinkIcon}>External Link</Button>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button variant="link"&gt;Link Button&lt;/Button&gt;</code></pre>
								</div>
							</div>
						</CardContent>
					</Card>

					<!-- Button Sizes -->
					<Card>
						<CardHeader>
							<CardTitle>Sizes</CardTitle>
							<CardDescription>Four different button sizes to fit your design</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="flex flex-wrap items-center gap-4 mb-6">
								<Button size="sm">Small</Button>
								<Button>Default</Button>
								<Button size="lg">Large</Button>
								<Button size="icon" icon={PlusIcon} />
							</div>
							
							<div class="space-y-2">
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button size="sm"&gt;Small&lt;/Button&gt;</code></pre>
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button&gt;Default&lt;/Button&gt;</code></pre>
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button size="lg"&gt;Large&lt;/Button&gt;</code></pre>
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button size="icon" icon={{PlusIcon}} /&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Button States -->
					<Card>
						<CardHeader>
							<CardTitle>States</CardTitle>
							<CardDescription>Different button states for various interactions</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="grid md:grid-cols-2 gap-6">
								<!-- Disabled State -->
								<div>
									<h4 class="font-medium mb-3">Disabled</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Button disabled>Disabled</Button>
										<Button variant="outline" disabled>Disabled Outline</Button>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button disabled&gt;Disabled&lt;/Button&gt;</code></pre>
								</div>

								<!-- Loading State -->
								<div>
									<h4 class="font-medium mb-3">Loading</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Button disabled>
											<LoaderIcon class="mr-2 h-4 w-4 animate-spin" />
											Loading...
										</Button>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Button disabled&gt;
  &lt;LoaderIcon class="mr-2 h-4 w-4 animate-spin" /&gt;
  Loading...
&lt;/Button&gt;</code></pre>
								</div>
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
							<CardDescription>Add the Button component to your project</CardDescription>
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

					<!-- Basic Usage -->
					<Card>
						<CardHeader>
							<CardTitle>Basic Usage</CardTitle>
							<CardDescription>Import and use the Button component</CardDescription>
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
							<CardTitle>Props</CardTitle>
							<CardDescription>Available properties for the Button component</CardDescription>
						</CardHeader>
						<CardContent>
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
										<tr class="border-b">
											<td class="p-2 font-mono">variant</td>
											<td class="p-2">"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"</td>
											<td class="p-2">"default"</td>
											<td class="p-2">The visual style variant</td>
										</tr>
										<tr class="border-b">
											<td class="p-2 font-mono">size</td>
											<td class="p-2">"sm" | "default" | "lg" | "icon"</td>
											<td class="p-2">"default"</td>
											<td class="p-2">The size of the button</td>
										</tr>
										<tr class="border-b">
											<td class="p-2 font-mono">icon</td>
											<td class="p-2">ComponentType | undefined</td>
											<td class="p-2">undefined</td>
											<td class="p-2">Icon component to display</td>
										</tr>
										<tr class="border-b">
											<td class="p-2 font-mono">iconPlacement</td>
											<td class="p-2">"left" | "right"</td>
											<td class="p-2">"left"</td>
											<td class="p-2">Position of the icon</td>
										</tr>
										<tr class="border-b">
											<td class="p-2 font-mono">disabled</td>
											<td class="p-2">boolean</td>
											<td class="p-2">false</td>
											<td class="p-2">Whether the button is disabled</td>
										</tr>
										<tr class="border-b">
											<td class="p-2 font-mono">href</td>
											<td class="p-2">string | undefined</td>
											<td class="p-2">undefined</td>
											<td class="p-2">URL to navigate to (renders as link)</td>
										</tr>
										<tr>
											<td class="p-2 font-mono">class</td>
											<td class="p-2">string</td>
											<td class="p-2">""</td>
											<td class="p-2">Additional CSS classes</td>
										</tr>
									</tbody>
								</table>
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
