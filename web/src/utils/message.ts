import { NotificationType } from '@/models/enums';
import { AppMessage } from '@/models/interfaces';

export const buildAppError = (error: {
  type: 'Fetch' | 'Delete' | 'Update' | 'Create';
  description?: string;
}): AppMessage => {
  let titleStr = '';
  switch (error.type) {
    case 'Fetch':
      titleStr = 'Buscar';
      break;
    case 'Delete':
      titleStr = 'Deletar';
      break;
    case 'Update':
      titleStr = 'Atualizar';
      break;
    case 'Create':
      titleStr = 'Criar';
      break;
  }
  return {
    title: `Erro ao ${titleStr} Dados`,
    type: NotificationType.ERROR,
    description:
      error.description !== undefined
        ? error.description
        : `Ocorreu um problema ao ${titleStr} os dados. Por favor tente novamente, se o problema persistir entre em contato com o suporte.`
  };
};

export const buildAppSuccess = (message: {
  type: 'Fetch' | 'Delete' | 'Update' | 'Create';
  description?: string;
}): AppMessage => {
  let titleStr = '';
  switch (message.type) {
    case 'Fetch':
      titleStr = 'Busca';
      break;
    case 'Delete':
      titleStr = 'Deleçao';
      break;
    case 'Update':
      titleStr = 'Atualização';
      break;
    case 'Create':
      titleStr = 'Criação';
      break;
  }
  return {
    title: `Transação bem sucedida`,
    type: NotificationType.SUCCESS,
    description:
      message.description !== undefined
        ? message.description
        : `${titleStr} de dados completa.`
  };
};
