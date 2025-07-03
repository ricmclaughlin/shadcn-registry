<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { themeStore, themes } from '$lib/stores/theme';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	
	// Icon imports
	import UserIcon from '@lucide/svelte/icons/user';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import BellIcon from '@lucide/svelte/icons/bell';
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
	
	const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/tabs.json`;
	const usageExample = `<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
<\/script>

<Tabs.Root value="account" class="w-[400px]">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    Make changes to your account here.
  </Tabs.Content>
  <Tabs.Content value="password">
    Change your password here.
  </Tabs.Content>
</Tabs.Root>`;
</script>

<svelte:head>
	<title>Tabs Component - UI Registry</title>
	<meta name="description" content="A set of layered sections of content—known as tab panels—that are displayed one at a time." />
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
					<Breadcrumb.Page>Tabs</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<!-- Hero Section -->
	<section class="py-12 px-4">
		<div class="container mx-auto">
			<div class="max-w-4xl mx-auto text-center">
				<div class="flex items-center justify-center space-x-2 mb-4">
					<h1 class="text-4xl md:text-5xl font-bold text-foreground">Tabs</h1>
					<Badge variant="secondary">Component</Badge>
				</div>
				<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					A set of layered sections of content—known as tab panels—that are displayed one at a time.
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
					<!-- Basic Tabs -->
					<Card>
						<CardHeader>
							<CardTitle>Basic Tabs</CardTitle>
							<CardDescription>Simple tabs with text content</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Tabs.Root value="overview" class="w-full max-w-md">
									<Tabs.List>
										<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
										<Tabs.Trigger value="details">Details</Tabs.Trigger>
										<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
									</Tabs.List>
									<Tabs.Content value="overview">
										<div class="p-4 border rounded-md bg-muted/30">
											<h4 class="font-medium mb-2">Overview</h4>
											<p class="text-sm text-muted-foreground">
												This is the overview tab content. Perfect for displaying summary information.
											</p>
										</div>
									</Tabs.Content>
									<Tabs.Content value="details">
										<div class="p-4 border rounded-md bg-muted/30">
											<h4 class="font-medium mb-2">Details</h4>
											<p class="text-sm text-muted-foreground">
												Detailed information goes here. Great for comprehensive data display.
											</p>
										</div>
									</Tabs.Content>
									<Tabs.Content value="settings">
										<div class="p-4 border rounded-md bg-muted/30">
											<h4 class="font-medium mb-2">Settings</h4>
											<p class="text-sm text-muted-foreground">
												Configuration options and preferences can be organized here.
											</p>
										</div>
									</Tabs.Content>
								</Tabs.Root>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Tabs.Root value="overview"&gt;
  &lt;Tabs.List&gt;
    &lt;Tabs.Trigger value="overview"&gt;Overview&lt;/Tabs.Trigger&gt;
    &lt;Tabs.Trigger value="details"&gt;Details&lt;/Tabs.Trigger&gt;
  &lt;/Tabs.List&gt;
  &lt;Tabs.Content value="overview"&gt;
    Overview content here
  &lt;/Tabs.Content&gt;
  &lt;Tabs.Content value="details"&gt;
    Details content here
  &lt;/Tabs.Content&gt;
&lt;/Tabs.Root&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Tabs with Components -->
					<Card>
						<CardHeader>
							<CardTitle>Tabs with Components</CardTitle>
							<CardDescription>Tabs containing other UI components</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Tabs.Root value="profile" class="w-full max-w-lg">
									<Tabs.List>
										<Tabs.Trigger value="profile">Profile</Tabs.Trigger>
										<Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
										<Tabs.Trigger value="security">Security</Tabs.Trigger>
									</Tabs.List>
									<Tabs.Content value="profile">
										<div class="p-4 border rounded-md space-y-4">
											<div class="flex items-center space-x-4">
												<div class="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
													<UserIcon class="h-6 w-6" />
												</div>
												<div>
													<h4 class="font-medium">John Doe</h4>
													<p class="text-sm text-muted-foreground">john@example.com</p>
												</div>
											</div>
											<div class="flex space-x-2">
												<Button size="sm">Edit Profile</Button>
												<Button variant="outline" size="sm">Change Avatar</Button>
											</div>
										</div>
									</Tabs.Content>
									<Tabs.Content value="notifications">
										<div class="p-4 border rounded-md space-y-3">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-2">
													<BellIcon class="h-4 w-4" />
													<span class="text-sm">Email notifications</span>
												</div>
												<Button variant="outline" size="sm">Enable</Button>
											</div>
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-2">
													<BellIcon class="h-4 w-4" />
													<span class="text-sm">Push notifications</span>
												</div>
												<Button variant="outline" size="sm">Disable</Button>
											</div>
										</div>
									</Tabs.Content>
									<Tabs.Content value="security">
										<div class="p-4 border rounded-md space-y-3">
											<div class="flex items-center justify-between">
												<div>
													<p class="text-sm font-medium">Two-factor authentication</p>
													<p class="text-xs text-muted-foreground">Add an extra layer of security</p>
												</div>
												<Button size="sm">Setup</Button>
											</div>
											<div class="flex items-center justify-between">
												<div>
													<p class="text-sm font-medium">Change password</p>
													<p class="text-xs text-muted-foreground">Update your password</p>
												</div>
												<Button variant="outline" size="sm">Change</Button>
											</div>
										</div>
									</Tabs.Content>
								</Tabs.Root>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Tabs.Root value="profile"&gt;
  &lt;Tabs.List&gt;
    &lt;Tabs.Trigger value="profile"&gt;Profile&lt;/Tabs.Trigger&gt;
    &lt;Tabs.Trigger value="notifications"&gt;Notifications&lt;/Tabs.Trigger&gt;
  &lt;/Tabs.List&gt;
  &lt;Tabs.Content value="profile"&gt;
    &lt;!-- Profile content with components --&gt;
  &lt;/Tabs.Content&gt;
  &lt;Tabs.Content value="notifications"&gt;
    &lt;!-- Notifications content --&gt;
  &lt;/Tabs.Content&gt;
&lt;/Tabs.Root&gt;</code></pre>
							</div>
						</CardContent>
					</Card>

					<!-- Full Width Tabs -->
					<Card>
						<CardHeader>
							<CardTitle>Full Width Tabs</CardTitle>
							<CardDescription>Tabs that span the full width of their container</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="space-y-4">
								<Tabs.Root value="dashboard" class="w-full">
									<Tabs.List class="grid w-full grid-cols-4">
										<Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
										<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
										<Tabs.Trigger value="reports">Reports</Tabs.Trigger>
										<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
									</Tabs.List>
									<Tabs.Content value="dashboard">
										<div class="p-6 border rounded-md bg-muted/30">
											<h4 class="font-medium mb-2">Dashboard</h4>
											<p class="text-sm text-muted-foreground">
												Your main dashboard with key metrics and overview information.
											</p>
										</div>
									</Tabs.Content>
									<Tabs.Content value="analytics">
										<div class="p-6 border rounded-md bg-muted/30">
											<h4 class="font-medium mb-2">Analytics</h4>
											<p class="text-sm text-muted-foreground">
												Detailed analytics and performance metrics for your application.
											</p>
										</div>
									</Tabs.Content>
									<Tabs.Content value="reports">
										<div class="p-6 border rounded-md bg-muted/30">
											<h4 class="font-medium mb-2">Reports</h4>
											<p class="text-sm text-muted-foreground">
												Generate and view various reports and data exports.
											</p>
										</div>
									</Tabs.Content>
									<Tabs.Content value="settings">
										<div class="p-6 border rounded-md bg-muted/30">
											<h4 class="font-medium mb-2">Settings</h4>
											<p class="text-sm text-muted-foreground">
												Configure your application settings and preferences.
											</p>
										</div>
									</Tabs.Content>
								</Tabs.Root>
								
								<pre class="bg-muted p-2 rounded text-xs overflow-x-auto"><code>&lt;Tabs.Root value="dashboard" class="w-full"&gt;
  &lt;Tabs.List class="grid w-full grid-cols-4"&gt;
    &lt;Tabs.Trigger value="dashboard"&gt;Dashboard&lt;/Tabs.Trigger&gt;
    &lt;Tabs.Trigger value="analytics"&gt;Analytics&lt;/Tabs.Trigger&gt;
    &lt;Tabs.Trigger value="reports"&gt;Reports&lt;/Tabs.Trigger&gt;
    &lt;Tabs.Trigger value="settings"&gt;Settings&lt;/Tabs.Trigger&gt;
  &lt;/Tabs.List&gt;
  &lt;!-- Tab content here --&gt;
&lt;/Tabs.Root&gt;</code></pre>
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
							<CardDescription>Add the Tabs component to your project</CardDescription>
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
							<CardDescription>Import and use the Tabs component</CardDescription>
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
								<!-- Tabs.Root -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Tabs.Root</h4>
									<p class="text-sm text-muted-foreground mb-3">The root container for the tabs component.</p>
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
													<td class="p-2 font-mono">value</td>
													<td class="p-2">string</td>
													<td class="p-2">undefined</td>
													<td class="p-2">The active tab value</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">onValueChange</td>
													<td class="p-2">function</td>
													<td class="p-2">undefined</td>
													<td class="p-2">Callback when tab changes</td>
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

								<!-- Tabs.List -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Tabs.List</h4>
									<p class="text-sm text-muted-foreground mb-3">Container for tab triggers.</p>
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

								<!-- Tabs.Trigger -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Tabs.Trigger</h4>
									<p class="text-sm text-muted-foreground mb-3">Individual tab trigger button.</p>
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
													<td class="p-2 font-mono">value</td>
													<td class="p-2">string</td>
													<td class="p-2">required</td>
													<td class="p-2">Unique value for this tab</td>
												</tr>
												<tr class="border-b">
													<td class="p-2 font-mono">disabled</td>
													<td class="p-2">boolean</td>
													<td class="p-2">false</td>
													<td class="p-2">Whether the tab is disabled</td>
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

								<!-- Tabs.Content -->
								<div>
									<h4 class="text-lg font-semibold mb-3">Tabs.Content</h4>
									<p class="text-sm text-muted-foreground mb-3">Content panel for each tab.</p>
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
													<td class="p-2 font-mono">value</td>
													<td class="p-2">string</td>
													<td class="p-2">required</td>
													<td class="p-2">Value matching the trigger</td>
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
