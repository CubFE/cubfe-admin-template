import { createApp, h, ref, reactive } from 'vue';
import MessageBox from '@/components/notification/MessageBox.vue';

interface MessageBoxOptions {
    title: string;
    message: string;
    durction: number;
    position: string;
    showCloseButton: boolean;
  }
  
  const useMessageBox = () => {
    const options = reactive<MessageBoxOptions & { visible: boolean }>({
      title: '',
      message: '',
      durction: 3000, // 默认显示3秒
      position: 'top-center',
      showCloseButton: true,
      visible: false
    });
  
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
  
    const app = createApp({
      render() {
        return h(MessageBox, {
          title: options.title,
          message: options.message,
          durction: options.durction,
          position: options.position,
          visible: options.visible,
          showCloseButton: options.showCloseButton,
          onClose: () => {
            options.visible = false;
          },
          onConfirm: () => {
            options.visible = false;
          }
        });
      }
    });
  
    app.mount(mountNode);
  
  
    const showMessageBox = (opts: MessageBoxOptions) => {
        options.title = opts.title;
        options.message = opts.message;
        options.showCloseButton = opts.showCloseButton;
        options.durction = opts.durction;
        options.position = opts.position;
        options.visible = true;
    
        // setTimeout(() => {
        //   hideMessageBox();
        // }, opts.durction *2);
      };
    
    //   const hideMessageBox = () => {
    //     debugger
    //     options.visible = false
    //   };
    
    return {
        showMessageBox
    };
  };
  
  export default useMessageBox;
