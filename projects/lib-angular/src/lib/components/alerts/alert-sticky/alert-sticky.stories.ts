import { Meta, StoryObj } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { AlertStickyComponent } from './alert-sticky.component';

@Component({
    selector: 'app-story-wrapper-sticky-alert',
    standalone: true,
    imports: [CommonModule, AlertStickyComponent],
    template: `
    <div>
      <p>Clique no botão para exibir o alerta com as configurações abaixo.</p>
      <button (click)="isAlertVisible.set(true)" style="padding: 8px 12px; cursor: pointer;">
        Mostrar Alerta
      </button>

      <lib-alert-sticky
        [isVisible]="isAlertVisible()"
        (closed)="isAlertVisible.set(false)"
        [alertClass]="alertClass()"
        [dismissAfterSeconds]="dismissAfterSeconds()">
          {{ projectedContent() }}
      </lib-alert-sticky>
    </div>
  `,
})
class StoryWrapperComponent {
    alertClass = input<string>('alert-blue');
    dismissAfterSeconds = input<number | null>(5);
    projectedContent = input<string>('Conteúdo do alerta.');

    isAlertVisible = signal(false);
}

const meta: Meta<StoryWrapperComponent> = {
    title: 'Components/Alerts/Alerta Sticky',
    component: StoryWrapperComponent,
    tags: ['autodocs'],
    argTypes: {
        alertClass: {
            control: 'select',
            options: ['alert-blue', 'alert-red', 'alert-yellow', 'alert-green'],
            description: 'Define o estilo de cor do alerta.',
        },
        dismissAfterSeconds: {
            control: 'number',
            description: 'Segundos para fechar. Use 0 ou deixe em branco para desativar.',
        },
        projectedContent: {
            control: 'text',
            name: 'Conteúdo do Alerta',
            description: 'O texto a ser exibido dentro do alerta.',
        },
    },
};

export default meta;

type Story = StoryObj<StoryWrapperComponent>;

export const ComAutoFechamento: Story = {
    name: '1. Com Auto-Fechamento e Pausa',
    args: {
        alertClass: 'alert-blue',
        dismissAfterSeconds: 7,
        projectedContent: 'Este alerta desaparecerá em 7s. Passe o mouse sobre ele para pausar a contagem!',
    },
};

export const FechamentoManual: Story = {
    name: '2. Fixo (Fechamento Manual)',
    args: {
        alertClass: 'alert-blue',
        dismissAfterSeconds: null,
        projectedContent: 'Este alerta só pode ser fechado manualmente.',
    },
};

export const AlertaDeErro: Story = {
    name: '3. Alerta de Erro com Tempo Maior',
    args: {
        alertClass: 'alert-red',
        dismissAfterSeconds: 120,
        projectedContent: 'Ocorreu um erro na operação. Verifique os dados e tente novamente.',
    },
};
