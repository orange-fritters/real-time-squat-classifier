import * as tf from "@tensorflow/tfjs";


/*
inputs=tf.keras.Input(shape=(171,2,1))

layer1 = Conv2D(filters=10, kernel_size=(1, 2), strides=(1, 1),padding='valid',kernel_regularizer=regularizers.l2(0.01))(inputs)
layer1=BatchNormalization()(layer1)
layer1=activations.relu(layer1)

flat = Flatten()(layer1)
layer2 = Dense(171, activation='relu')(flat)
layer3 = Dense(70, activation='relu')(layer2)

drop = Dropout(0.1)(layer3)
layer4 = Dense(7, activation = 'softmax')(drop)
outputs=layer4

my_model=tf.keras.Model(inputs=inputs,outputs=outputs)

*/
const FFT_Dense = () => {
  const inputs = tf.input({ shape: [171, 2, 1] });
  let layer1 = tf.layers
    .conv2d({
      filters: 10,
      kernelSize: [1, 2],
      strides: [1, 1],
      padding: "valid",
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }),
    })
    .apply(inputs);
  layer1 = tf.layers.batchNormalization().apply(layer1);
  layer1 = tf.layers.reLU().apply(layer1);

  let flat = tf.layers.flatten().apply(layer1);

  let layer2 = tf.layers.dense({units: 171, activation:"relu"}).apply(flat);
  let layer3 = tf.layers.dense({units: 70, activation:"relu"}).apply(layer2);
  let drop = tf.layers.dropout({rate:0.1}).apply(layer3);
  let layer4 = tf.layers.dense({units: 7, activation:"softmax"}).apply(drop);

  const outputs = layer4;
  const my_model = tf.model({
    inputs: inputs,
    outputs: outputs as tf.SymbolicTensor,
  });

  return my_model;
};

export default FFT_Dense;