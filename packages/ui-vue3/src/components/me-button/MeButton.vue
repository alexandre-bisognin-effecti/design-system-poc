<!-- Versão 1.1.4 -->

<template>
	<button
		:class="[ 'base-btn', buttonClasses, `me-button-icon-${iconPosition}` ]"
		:style="buttonStyles"
		:disabled="disabled"
		@click="$emit('click')"
		:title="tooltipText"
	>
		<span v-if="showIcon || showActiveIconOutlined" class="material-icons-outlined base-btn-icon">
			{{ icon }}
		</span>
		<span v-if="showActiveIcon" class="material-icons base-btn-icon">
			{{ icon }}
		</span>
		<span
			v-if="showCustomIcon"
			class="material-icons-outlined base-btn-icon-custom"
			:style="{ 'color': iconColor }"
		>
			{{ icon }}
		</span>
		<span v-if="label" class="base-btn-label">
			{{ label }}
		</span>
		<slot v-if="!label" class="base-btn-label"/>
		<span v-if="notificationDot" class="me-button__notification-dot"></span>
	</button>
</template>

<script lang="ts" src="./MeButton.ts"></script>
<style lang="scss" src="../../assets/scss/variables/_colors.scss"></style>
<style lang="scss" scoped src="./MeButton.scss"></style>
