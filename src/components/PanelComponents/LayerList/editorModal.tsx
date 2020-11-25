import React, { memo, useEffect, FC } from 'react';
import { Form, Select,Input, InputNumber,Switch, Modal, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { TLayerDataListDefaultTypeItem } from '../FormEditor/types';
// import styles from './index.less';
// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e && e.fileList;
// };

// const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export type EditorModalProps = {
  visible: boolean;
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  item?: TLayerDataListDefaultTypeItem;
  onSave: Function;
 // cropRate: number;
};

const EditorModal: FC<EditorModalProps> = props => {
  const { item, onSave, visible, onCancel } = props;
 // console.log("item",item)
  const onFinish = (values: Store) => {
 //   console.log("finish values : ",values);
    onSave && onSave(values);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if (item) {
        //  console.log("values : ",values)
          values.id = item.id;
          values.visibility = Number(values.visibility)
          onSave && onSave(values);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [form] = Form.useForm();

  // function onChange(checked){
  //   checked = !checked;
  // }
  useEffect(() => {
    if (form && item && visible) {
      form.resetFields();
    }
  }, [form, item, visible]);
  return (
    <>
      {!!item && (
        <Modal
          title="编辑层信息"
          closable={false}
          visible={visible}
          onOk={handleOk}
          okText="确定"
          forceRender
          footer={
            <Button type={'primary'} onClick={() => handleOk()}>
              确定
            </Button>
          }
        >
          <Form
            form={form}
            name={`form_editor_modal`}
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={item}
          >
            <Form.Item
              label="层级"
              name="zIndex"
              rules={[{ required: true, message: '请输入标题!' }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="显隐" name="visibility" valuePropName="checked">
              <Switch  checkedChildren="显示"   unCheckedChildren="隐藏" defaultChecked={!!item.visibility} />
            </Form.Item>
            <Form.Item label="描述" name="desc">
              <Input />
            </Form.Item>

          </Form>
        </Modal>
      )}
    </>
  );
};

export default memo(EditorModal);
