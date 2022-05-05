<template>
  <div>登录页</div>
</template>

<script setup lang="ts">
  import useUserStore from '/@/store/modules/user';
  // import { ElNotification, ElMessage } from 'element-plus';
  // import 'element-plus/es/components/notification/style';
  // import 'element-plus/theme-chalk/el-message.css';
  const userStore = useUserStore;
  userStore.setToken('1111');
  ElNotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success',
  });
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
  setTimeout(() => {
    ElMessage.closeAll();
    ElNotification.closeAll();
  }, 1000);
</script>
