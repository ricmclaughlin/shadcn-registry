<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import { Alert, AlertTitle, AlertDescription } from '$lib/components/ui/alert';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	
	// Icon imports
	import InfoIcon from '@lucide/svelte/icons/info';
	import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
	import XCircleIcon from '@lucide/svelte/icons/x-circle';
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
	
	const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/alert.json`;
	const usageExample = `<script lang="ts">
  import { Alert, AlertTitle, AlertDescription } from "$lib/components/ui/alert";
  import InfoIcon from "@lucide/svelte/icons/info";
<\/script>

<Alert icon={InfoIcon}>
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    This is an informational alert message.
  </AlertDescription>
</Alert>`;
</script>

<svelte:head>
	<title>Alert Component - UI Registry</title>
	<meta name="description" content="A flexible alert component for displaying important messages with icon support." />
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
					<Breadcrumb.Page>Alert</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<!-- Hero Section -->
	<section class="py-12 px-4">
		<div class="container mx-auto">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center space-x-2 mb-4">
					<h1 class="text-4xl md:text-5xl font-bold text-foreground">Alert</h1>
					<Badge variant="secondary">Component</Badge>
				</div>
				<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					A flexible alert component for displaying important messages with icon support.
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
					<!-- Alert Variants -->
					<Card>
						<CardHeader>
							<CardTitle>Variants</CardTitle>
							<CardDescription>Different alert styles for various message types</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<!-- Default Alert -->
								<div>
									<h4 class="font-medium mb-3">Default</h4>
									<Alert icon={InfoIcon}>
										<AlertTitle>Information</AlertTitle>
										<AlertDescription>
											This is a default informational alert message.
										</AlertDescription>
									</Alert>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto mt-2"><code>&lt;Alert icon={{InfoIcon}}&gt;
  &lt;AlertTitle&gt;Information&lt;/AlertTitle&gt;
  &lt;AlertDescription&gt;
    This is a default informational alert message.
  &lt;/AlertDescription&gt;
&lt;/Alert&gt;</code></pre>
								</div>

								<!-- Destructive Alert -->
								<div>
									<h4 class="font-medium mb-3">Destructive</h4>
									<Alert variant="destructive" icon={XCircleIcon}>
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>
											Something went wrong. Please try again later.
										</AlertDescription>
									</Alert>
									<pre class="bg-muted p-2 rounded text-xs overflow-x-auto mt-2"><code>&lt;Alert variant="destructive" icon={{XCircleIcon}}&gt;
  &lt;AlertTitle&gt;Error&lt;/AlertTitle&gt;
  &lt;AlertDescription&gt;
    Something went wrong. Please try again later.
  &lt;/AlertDescription&gt;
&lt;/Alert&gt;</code></pre>
								</div>
							</div>
						</CardContent>
					</Card>

					<!-- Alert with Different Icons -->
					<Card>
						<CardHeader>
							<CardTitle>With Different Icons</CardTitle>
							<CardDescription>Alerts with various icons to convey different message types</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<!-- Success Alert -->
								<Alert icon={CheckCircleIcon}>
									<AlertTitle>Success</AlertTitle>
									<AlertDescription>
										Your changes have been saved successfully.
									</AlertDescription>
								</Alert>

								<!-- Warning Alert -->
								<Alert icon={AlertTriangleIcon}>
									<AlertTitle>Warning</AlertTitle>
									<AlertDescription>
										Please review your settings before proceeding.
									</AlertDescription>
								</Alert>

								<!-- Error Alert -->
								<Alert variant="destructive" icon={XCircleIcon}>
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										Unable to process your request. Please contact support.
									</AlertDescription>
								</Alert>
							</div>
						</CardContent>
					</Card>

					<!-- Alert Without Icons -->
					<Card>
						<CardHeader>
							<CardTitle>Without Icons</CardTitle>
							<CardDescription>Simple alerts without icons for minimal design</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Alert>
									<AlertTitle>Simple Alert</AlertTitle>
									<AlertDescription>
										This is a simple alert without an icon.
									</AlertDescription>
								</Alert>

								<Alert variant="destructive">
									<AlertTitle>Error Alert</AlertTitle>
									<AlertDescription>
										This is an error alert without an icon.
									</AlertDescription>
								</Alert>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Alert&gt;
  &lt;AlertTitle&gt;Simple Alert&lt;/AlertTitle&gt;
  &lt;AlertDescription&gt;
    This is a simple alert without an icon.
  &lt;/AlertDescription&gt;
&lt;/Alert&gt;</code></pre>
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
							<CardDescription>Add the Alert component to your project</CardDescription>
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
							<CardDescription>Import and use the Alert component</CardDescription>
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
							<CardDescription>Available components and their properties</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-6">
								<!-- Alert -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Alert</h4>
									<p class="text-sm text-muted-foreground mb-3">The main alert container component.</p>
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
													<td class="p-2">"default" | "destructive"</td>
													<td class="p-2">"default"</td>
													<td class="p-2">The visual style variant</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">icon</td>
													<td class="p-2">ComponentType | undefined</td>
													<td class="p-2">undefined</td>
													<td class="p-2">Icon component to display</td>
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
								</div>

								<!-- AlertTitle -->
								<div>
									<h4 class="text-lg font-semibold mb-3">AlertTitle</h4>
									<p class="text-sm text-muted-foreground mb-3">The alert title component.</p>
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

								<!-- AlertDescription -->
								<div>
									<h4 class="text-lg font-semibold mb-3">AlertDescription</h4>
									<p class="text-sm text-muted-foreground mb-3">The alert description component.</p>
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
