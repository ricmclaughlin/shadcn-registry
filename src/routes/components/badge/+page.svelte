<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	
	// Icon imports
	import CheckIcon from '@lucide/svelte/icons/check';
	import XIcon from '@lucide/svelte/icons/x';
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
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
	
	const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/badge.json`;
	const usageExample = `<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
<\/script>

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>`;
</script>

<svelte:head>
	<title>Badge Component - UI Registry</title>
	<meta name="description" content="A versatile badge component for displaying status, tags, and notifications." />
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
					<Breadcrumb.Page>Badge</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<!-- Hero Section -->
	<section class="py-12 px-4">
		<div class="container mx-auto">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center space-x-2 mb-4">
					<h1 class="text-4xl md:text-5xl font-bold text-foreground">Badge</h1>
					<Badge variant="secondary">Component</Badge>
				</div>
				<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					A versatile badge component for displaying status, tags, and notifications.
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
					<!-- Badge Variants -->
					<Card>
						<CardHeader>
							<CardTitle>Variants</CardTitle>
							<CardDescription>Different visual styles for various use cases</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="grid md:grid-cols-2 gap-6">
								<!-- Default Variant -->
								<div>
									<h4 class="font-medium mb-3">Default</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Badge>Default</Badge>
										<Badge>New</Badge>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Badge&gt;Default&lt;/Badge&gt;</code></pre>
								</div>

								<!-- Secondary Variant -->
								<div>
									<h4 class="font-medium mb-3">Secondary</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Badge variant="secondary">Secondary</Badge>
										<Badge variant="secondary">Draft</Badge>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Badge variant="secondary"&gt;Secondary&lt;/Badge&gt;</code></pre>
								</div>

								<!-- Destructive Variant -->
								<div>
									<h4 class="font-medium mb-3">Destructive</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Badge variant="destructive">Error</Badge>
										<Badge variant="destructive">Failed</Badge>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Badge variant="destructive"&gt;Error&lt;/Badge&gt;</code></pre>
								</div>

								<!-- Outline Variant -->
								<div>
									<h4 class="font-medium mb-3">Outline</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Badge variant="outline">Outline</Badge>
										<Badge variant="outline">Pending</Badge>
									</div>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Badge variant="outline"&gt;Outline&lt;/Badge&gt;</code></pre>
								</div>
							</div>
						</CardContent>
					</Card>

					<!-- Badge with Icons -->
					<Card>
						<CardHeader>
							<CardTitle>With Icons</CardTitle>
							<CardDescription>Badges enhanced with icons for better visual communication</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<div class="flex flex-wrap gap-2">
									<Badge class="flex items-center gap-1">
										<CheckIcon class="h-3 w-3" />
										Success
									</Badge>
									<Badge variant="destructive" class="flex items-center gap-1">
										<XIcon class="h-3 w-3" />
										Failed
									</Badge>
									<Badge variant="secondary" class="flex items-center gap-1">
										<AlertTriangleIcon class="h-3 w-3" />
										Warning
									</Badge>
								</div>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Badge class="flex items-center gap-1"&gt;
  &lt;CheckIcon class="h-3 w-3" /&gt;
  Success
&lt;/Badge&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Badge Sizes -->
					<Card>
						<CardHeader>
							<CardTitle>Usage Examples</CardTitle>
							<CardDescription>Common patterns for using badges in different contexts</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<!-- Status Indicators -->
								<div>
									<h4 class="font-medium mb-3">Status Indicators</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Badge>Active</Badge>
										<Badge variant="secondary">Inactive</Badge>
										<Badge variant="destructive">Suspended</Badge>
										<Badge variant="outline">Pending</Badge>
									</div>
								</div>

								<!-- Tags -->
								<div>
									<h4 class="font-medium mb-3">Tags</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Badge variant="secondary">React</Badge>
										<Badge variant="secondary">TypeScript</Badge>
										<Badge variant="secondary">Svelte</Badge>
										<Badge variant="secondary">UI/UX</Badge>
									</div>
								</div>

								<!-- Notifications -->
								<div>
									<h4 class="font-medium mb-3">Notifications</h4>
									<div class="flex flex-wrap gap-2 mb-4">
										<Badge>5</Badge>
										<Badge variant="destructive">99+</Badge>
										<Badge variant="outline">New</Badge>
									</div>
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
							<CardDescription>Add the Badge component to your project</CardDescription>
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
							<CardDescription>Import and use the Badge component</CardDescription>
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
							<CardDescription>Available properties for the Badge component</CardDescription>
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
											<td class="p-2">"default" | "secondary" | "destructive" | "outline"</td>
											<td class="p-2">"default"</td>
											<td class="p-2">The visual style variant</td>
										</tr>
										<tr class="border-b">
											<td class="p-2 font-mono">class</td>
											<td class="p-2">string</td>
											<td class="p-2">""</td>
											<td class="p-2">Additional CSS classes</td>
										</tr>
										<tr>
											<td class="p-2 font-mono">children</td>
											<td class="p-2">any</td>
											<td class="p-2">undefined</td>
											<td class="p-2">Badge content (text, icons, etc.)</td>
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
