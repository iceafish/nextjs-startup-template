/**
 * 显示对话框并返回用户操作结果的 Promise
 * @example
 * const showDialog = useDialog();
 * const handleClick = async () => {
 *   const result = await showDialog({
 *     title: 'Confirm',
 *     content: 'Are you sure?',
 *     confirm: 'Yes',
 *     cancel: 'No',
 *     type: DialogType.INFO,
 *     closeable: true,
 *     onConfirm: () => Promise.resolve("data"),
 *   });
 *   console.log(result); // true or false
 */
export { useDialog } from "./common";
