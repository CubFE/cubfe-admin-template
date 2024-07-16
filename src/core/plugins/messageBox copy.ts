import { createApp, ref, h } from 'vue';
import MessageBox from '@/components/notification/MessageBox.vue';

interface MessageBoxOptions {
  title: string;
  message: string;
  duration: number;
  position: string;
  showCloseButton: boolean;
}

interface MessageBoxInstance extends MessageBoxOptions {
  id: number;
  visible: boolean;
}

const useMessageBox = () => {
  const messageQueue = ref<MessageBoxInstance[]>([]);
  let nextMessageId = 0;

  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);

  const app = createApp({
    render() {
      return messageQueue.value.map(message => {
        return h(MessageBox, {
          key: message.id,
          title: message.title,
          message: message.message,
          duration: message.duration || 3000,
          position: message.position,
          visible: message.visible,
          showCloseButton: message.showCloseButton,
          onClose: () => {
            hideMessageBox(message.id);
          }
        });
      });
    }
  });
  app.mount(mountNode);

  const showMessageBox = (opts: MessageBoxOptions) => {
    const message: MessageBoxInstance = {
      ...opts,
      id: nextMessageId++,
      visible: true
    };
    messageQueue.value.push(message);

    setTimeout(() => {
      hideMessageBox(message.id);
    }, opts.duration);
  };

  const hideMessageBox = (id: number) => {
    const index = messageQueue.value.findIndex(message => message.id === id);
    if (index !== -1) {
      messageQueue.value.splice(index, 1);
    }
  };

  return {
    showMessageBox
  };
};

export default useMessageBox;
