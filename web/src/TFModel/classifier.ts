import * as tf from "@tensorflow/tfjs";

/* 
def resblock(frames):
    input_layer=Input(shape=frames)
    
    res_layer=Conv2D(filters=256,kernel_size=(1,3),strides=(1,2),padding='same')(input_layer)
    res_layer=BatchNormalization()(res_layer)    
    
    conv1d_layer1=Conv2D(filters=256,kernel_size=(1,3),strides=(1,2),padding='same',kernel_regularizer=regularizers.l2(0.01))(input_layer)
    conv1d_layer1=BatchNormalization()(conv1d_layer1)
    conv1d_layer1=activations.relu(conv1d_layer1)

    conv1d_layer1=Conv2D(filters=256,kernel_size=(1,3),strides=(1,1),padding='same')(conv1d_layer1)
    conv1d_layer1=BatchNormalization()(conv1d_layer1)
    conv1d_layer1=activations.relu(conv1d_layer1)

    conv1d_layer1=Conv2D(filters=256,kernel_size=(1,3),strides=(1,1),padding='same')(conv1d_layer1)
    conv1d_layer1=BatchNormalization()(conv1d_layer1)
    conv1d_layer1=activations.relu(conv1d_layer1)

    conv1d_layer1=Dropout(0.2)(conv1d_layer1)

    output=tf.keras.layers.Add()([res_layer,conv1d_layer1])
    block=tf.keras.Model(inputs=input_layer,outputs=output)
    
    return block

inputs=tf.keras.Input(shape=(171,300,1))
layer1 = Conv2D(filters=256, kernel_size=(1, 3), strides=(1, 2),padding='same',kernel_regularizer=regularizers.l2(0.01))(inputs)
layer1=BatchNormalization()(layer1)
layer1=activations.relu(layer1)
layer2=resblock((171,150,256))(layer1)
layer3=resblock((171,75,256))(layer2)
layer4=resblock((171,38,256))(layer3)
layer5=resblock((171,19,256))(layer4)
layer6= AveragePooling2D(pool_size=(171,10),strides=(1,1),padding='valid')(layer5)
layer6=Dropout(0.2)(layer6)
layer7=Conv2D(filters=7,kernel_size=(1,1),strides=(1,1),activation='softmax')(layer6)
outputs=layer7
my_model=tf.keras.Model(inputs=inputs,outputs=outputs) */

function resblock(frames: number[]) {
  const input = tf.input({ shape: frames });

  let res_output = tf.layers
    .conv2d({
      filters: 256,
      kernelSize: [1, 3],
      strides: [1, 2],
      padding: "same",
    })
    .apply(input);
  res_output = tf.layers
    .batchNormalization()
    .apply(res_output) as tf.SymbolicTensor;

  let conv1d_layer1_output = tf.layers
    .conv2d({
      filters: 256,
      kernelSize: [1, 3],
      strides: [1, 2],
      padding: "same",
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }),
    })
    .apply(input) as tf.SymbolicTensor;

  conv1d_layer1_output = tf.layers
    .batchNormalization()
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;
  conv1d_layer1_output = tf.layers
    .reLU()
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;

  conv1d_layer1_output = tf.layers
    .conv2d({
      filters: 256,
      kernelSize: [1, 3],
      strides: [1, 1],
      padding: "same",
    })
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;
  conv1d_layer1_output = tf.layers
    .batchNormalization()
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;
  conv1d_layer1_output = tf.layers
    .reLU()
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;

  conv1d_layer1_output = tf.layers
    .conv2d({
      filters: 256,
      kernelSize: [1, 3],
      strides: [1, 1],
      padding: "same",
    })
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;
  conv1d_layer1_output = tf.layers
    .batchNormalization()
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;
  conv1d_layer1_output = tf.layers
    .reLU()
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;

  conv1d_layer1_output = tf.layers
    .dropout({ rate: 0.2 })
    .apply(conv1d_layer1_output) as tf.SymbolicTensor;

  let output = tf.layers.add().apply([res_output, conv1d_layer1_output]);
  const block = tf.model({
    inputs: input,
    outputs: output as tf.SymbolicTensor,
  });

  return block;
}

const ResNet = () => {
  const inputs = tf.input({ shape: [171, 300, 1] });
  let layer1 = tf.layers
    .conv2d({
      filters: 256,
      kernelSize: [1, 3],
      strides: [1, 2],
      padding: "same",
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }),
    })
    .apply(inputs);
  layer1 = tf.layers.batchNormalization().apply(layer1);
  layer1 = tf.layers.reLU().apply(layer1);
  let layer2 = resblock([171, 150, 256]).apply(layer1);
  let layer3 = resblock([171, 75, 256]).apply(layer2);
  let layer4 = resblock([171, 38, 256]).apply(layer3);
  let layer5 = resblock([171, 19, 256]).apply(layer4);
  let layer6 = tf.layers
    .averagePooling2d({
      poolSize: [171, 10],
      strides: [1, 1],
      padding: "valid",
    })
    .apply(layer5);
  layer6 = tf.layers.dropout({ rate: 0.2 }).apply(layer6);
  const layer7 = tf.layers
    .conv2d({
      filters: 7,
      kernelSize: [1, 1],
      strides: [1, 1],
      activation: "softmax",
    })
    .apply(layer6);
  const outputs = layer7;
  const my_model = tf.model({
    inputs: inputs,
    outputs: outputs as tf.SymbolicTensor,
  });

  return my_model;
};

export default ResNet;
