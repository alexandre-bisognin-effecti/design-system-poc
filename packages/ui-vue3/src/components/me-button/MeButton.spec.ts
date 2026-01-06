import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MeButton from './MeButton.vue'
import { ButtonVariant } from '../../utils/enums/Enums'

describe('MeButton', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o componente corretamente', () => {
      const wrapper = mount(MeButton)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('deve renderizar com label quando fornecido', () => {
      const wrapper = mount(MeButton, {
        props: { label: 'Clique aqui' }
      })
      expect(wrapper.text()).toContain('Clique aqui')
      expect(wrapper.find('.base-btn-label').text()).toBe('Clique aqui')
    })

    it('deve renderizar slot quando não há label', () => {
      const wrapper = mount(MeButton, {
        slots: {
          default: 'Conteúdo do Slot'
        }
      })
      expect(wrapper.html()).toContain('Conteúdo do Slot')
    })
  })

  describe('Props e estados', () => {
    it('deve aplicar a variante padrão BLUE', () => {
      const wrapper = mount(MeButton)
      expect(wrapper.classes()).toContain(ButtonVariant.BLUE)
    })

    it('deve aplicar variante customizada', () => {
      const wrapper = mount(MeButton, {
        props: { variant: ButtonVariant.RED }
      })
      expect(wrapper.classes()).toContain(ButtonVariant.RED)
    })

    it('deve ficar desabilitado quando disabled=true', () => {
      const wrapper = mount(MeButton, {
        props: { disabled: true }
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('deve aplicar tooltip quando fornecido', () => {
      const wrapper = mount(MeButton, {
        props: { tooltipText: 'Texto do tooltip' }
      })
      expect(wrapper.attributes('title')).toBe('Texto do tooltip')
    })
  })

  describe('Estilos e variações', () => {
    it('deve aplicar estilo padrão quando nenhum estilo especial é fornecido', () => {
      const wrapper = mount(MeButton)
      expect(wrapper.classes()).toContain('default-style')
      expect(wrapper.classes()).not.toContain('outlined-style')
      expect(wrapper.classes()).not.toContain('flat-style')
    })

    it('deve aplicar estilo outlined', () => {
      const wrapper = mount(MeButton, {
        props: { outlined: true }
      })
      expect(wrapper.classes()).toContain('outlined-style')
      expect(wrapper.classes()).not.toContain('default-style')
    })

    it('deve aplicar estilo flat', () => {
      const wrapper = mount(MeButton, {
        props: { flat: true }
      })
      expect(wrapper.classes()).toContain('flat-style')
      expect(wrapper.classes()).not.toContain('default-style')
    })

    it('deve aplicar estilo custom com cores personalizadas', () => {
      const wrapper = mount(MeButton, {
        props: {
          custom: true,
          borderColor: '#ff0000',
          labelColor: '#00ff00'
        }
      })
      expect(wrapper.classes()).toContain('custom-style')
      expect(wrapper.attributes('style')).toContain('border-color: rgb(255, 0, 0)')
      expect(wrapper.attributes('style')).toContain('color: rgb(0, 255, 0)')
    })
  })

  describe('Ícones', () => {
    it('deve renderizar ícone quando fornecido', () => {
      const wrapper = mount(MeButton, {
        props: { icon: 'home' }
      })
      const iconElement = wrapper.find('.base-btn-icon')
      expect(iconElement.exists()).toBe(true)
      expect(iconElement.text()).toBe('home')
    })

    it('deve posicionar ícone à esquerda por padrão', () => {
      const wrapper = mount(MeButton, {
        props: { icon: 'home', label: 'Início' }
      })
      expect(wrapper.classes()).toContain('me-button-icon-left')
    })

    it('deve posicionar ícone à direita quando especificado', () => {
      const wrapper = mount(MeButton, {
        props: { icon: 'home', label: 'Início', iconPosition: 'right' }
      })
      expect(wrapper.classes()).toContain('me-button-icon-right')
    })

    it('deve renderizar ícone outlined quando activeIconOutlined=true', () => {
      const wrapper = mount(MeButton, {
        props: { icon: 'star', active: true, activeIconOutlined: true }
      })
      expect(wrapper.find('.material-icons-outlined').exists()).toBe(true)
      expect(wrapper.find('.material-icons').exists()).toBe(false)
    })

    it('deve renderizar ícone filled quando active=true sem activeIconOutlined', () => {
      const wrapper = mount(MeButton, {
        props: { icon: 'star', active: true }
      })
      expect(wrapper.find('.material-icons').exists()).toBe(true)
    })

    it('deve renderizar ícone custom com cor personalizada', () => {
      const wrapper = mount(MeButton, {
        props: { icon: 'settings', custom: true, iconColor: '#ff00ff' }
      })
      const customIcon = wrapper.find('.base-btn-icon-custom')
      expect(customIcon.exists()).toBe(true)
      expect(customIcon.attributes('style')).toContain('color: rgb(255, 0, 255)')
    })
  })

  describe('Estados ativos', () => {
    it('deve aplicar classe active-blue-style quando active=true', () => {
      const wrapper = mount(MeButton, {
        props: { active: true }
      })
      expect(wrapper.classes()).toContain('active-blue-style')
    })

    it('deve aplicar classe active-pink-style quando activePink=true', () => {
      const wrapper = mount(MeButton, {
        props: { activePink: true }
      })
      expect(wrapper.classes()).toContain('active-pink-style')
    })

    it('deve aplicar classe active-yellow-style quando activeYellow=true', () => {
      const wrapper = mount(MeButton, {
        props: { activeYellow: true }
      })
      expect(wrapper.classes()).toContain('active-yellow-style')
    })
  })

  describe('Notificação', () => {
    it('deve renderizar dot de notificação quando notificationDot=true', () => {
      const wrapper = mount(MeButton, {
        props: { notificationDot: true }
      })
      expect(wrapper.find('.me-button__notification-dot').exists()).toBe(true)
    })

    it('não deve renderizar dot de notificação por padrão', () => {
      const wrapper = mount(MeButton)
      expect(wrapper.find('.me-button__notification-dot').exists()).toBe(false)
    })
  })

  describe('Eventos', () => {
    it('deve emitir evento click quando clicado', async () => {
      const wrapper = mount(MeButton, {
        props: { label: 'Clique' }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.length).toBeGreaterThanOrEqual(1)
    })

    it('não deve emitir eventos quando desabilitado', async () => {
      const wrapper = mount(MeButton, {
        props: { label: 'Clique', disabled: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Casos de uso reais', () => {
    it('deve renderizar botão primário com ícone e label', () => {
      const wrapper = mount(MeButton, {
        props: {
          label: 'Salvar',
          icon: 'save',
          variant: ButtonVariant.BLUE
        }
      })
      expect(wrapper.text()).toContain('Salvar')
      expect(wrapper.find('.base-btn-icon').text()).toBe('save')
      expect(wrapper.classes()).toContain(ButtonVariant.BLUE)
    })

    it('deve renderizar botão de ação secundária outlined', () => {
      const wrapper = mount(MeButton, {
        props: {
          label: 'Cancelar',
          outlined: true,
          variant: ButtonVariant.GRAY
        }
      })
      expect(wrapper.classes()).toContain('outlined-style')
      expect(wrapper.classes()).toContain(ButtonVariant.GRAY)
    })

    it('deve renderizar botão icon-only para toolbar', () => {
      const wrapper = mount(MeButton, {
        props: {
          icon: 'delete',
          flat: true,
          tooltipText: 'Excluir item'
        }
      })
      expect(wrapper.find('.base-btn-label').exists()).toBe(false)
      expect(wrapper.find('.base-btn-icon').exists()).toBe(true)
      expect(wrapper.attributes('title')).toBe('Excluir item')
    })
  })
})
