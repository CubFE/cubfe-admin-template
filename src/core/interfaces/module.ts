/**
 * M: 顶级目录
 * CM: 除顶级目录外的次级目录
 * C: 菜单项
 * F: 功能项
 */
type childrenType = 'M' | 'CM' | 'C' | 'F';
/**
 * 路由菜单及页面功能类
 */
export interface IModule {
    modId: number // 路由id
    parentId: number // 父级路由id
    path: string
    component?: any
    name?: string
    redirect?: string
    meta?: {
        pageTitle?: string // 页面标题
        type: childrenType //类型
        icon?: string //图标
        hideSidebar?: boolean //不显示在侧边栏菜单中
    }
    children?: Array<IModule>
}