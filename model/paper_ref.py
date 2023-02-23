import tensorflow as tf
import tensorflow.keras.layers as layers


def conv_block(input_tensor, kernel_size, filters, strides=1, conv_shortcut=False):
    """
    a building block for ResNet50 implemented with TF Keras Functional API.

    Question (d)
    - consists of three [Conv2D+BN]s and a shortcut.
    - if a shortcut needs to match dimensions, apply Conv2D+BN to input_tensor.
    - otherwise, a shortcut is just input_tensor.
    - refer to the figure 2 in the pdf file to place ReLUs.

    Inputs
    - input_tensor: input tensor.
    - kernel_size: filter size
    - filters: a list of the numbers of channels; e.g. [9, 16, 25]
    - strides
    - conv_shortcut: indicates whether a shortcut connection uses a Conv2D.
    Returns
    - x: output tensor
    """
    shortcut = input_tensor

    if conv_shortcut:
        shortcut = layers.Conv2D(filters[3], kernel_size, strides=strides * 2, padding='same')(shortcut)
        shortcut = layers.BatchNormalization()(shortcut)

        x = layers.Conv2D(filters[0], kernel_size, strides=strides * 2, padding='same')(input_tensor)
    else:
        x = layers.Conv2D(filters[0], kernel_size, strides=strides, padding='same')(input_tensor)

    x = layers.BatchNormalization()(x)
    x = layers.Activation('relu')(x)

    x = layers.Conv2D(filters[1], (kernel_size[0] * 3, kernel_size[0] * 3), strides=strides, padding='same')(x)
    x = layers.BatchNormalization()(x)
    x = layers.Activation('relu')(x)

    x = layers.Conv2D(filters[2], kernel_size, strides=strides, padding='same')(x)
    x = layers.BatchNormalization()(x)

    x = layers.Add()([x, shortcut])
    x = layers.Activation('relu')(x)

    shortcut = x
    return x


def ResNet50(input_shape=(224, 224, 3)):
    """
    Builds a ResNet50 model.

    Question (d)
    - complete the model from conv2_x to conv5_x.
    - refer to the figure 2 for the overall architecture.

    Inputs
    - input_shape: the shape of the input image.
    Returns
    - a TF Keras Model model of ResNet50
    """
    # input layer

    input_tensor = layers.Input(shape=input_shape)

    # conv1
    x = layers.ZeroPadding2D(padding=(3, 3))(input_tensor)
    x = layers.Conv2D(64, (7, 7), strides=(2, 2), padding='valid', kernel_initializer='he_normal')(x)
    x = layers.BatchNormalization()(x)
    x = layers.Activation('relu')(x)
    x = layers.ZeroPadding2D(padding=(1, 1))(x)

    # conv2_x
    x = layers.MaxPooling2D((3, 3), 2)(x)
    x = conv_block(x, (1, 1), [64, 64, 256, 256], 1, True)
    x = conv_block(x, (1, 1), [64, 64, 256, 256], 1)
    x = conv_block(x, (1, 1), [64, 64, 256, 256], 1)

    # conv3_x
    x = conv_block(x, (1, 1), [128, 128, 512, 512], 1, True)
    x = conv_block(x, (1, 1), [128, 128, 512, 512], 1)
    x = conv_block(x, (1, 1), [128, 128, 512, 512], 1)
    x = conv_block(x, (1, 1), [128, 128, 512, 512], 1)
    # conv4_x
    x = conv_block(x, (1, 1), [256, 256, 1024, 1024], 1, True)
    x = conv_block(x, (1, 1), [256, 256, 1024, 1024], 1)
    x = conv_block(x, (1, 1), [256, 256, 1024, 1024], 1)
    x = conv_block(x, (1, 1), [256, 256, 1024, 1024], 1)
    x = conv_block(x, (1, 1), [256, 256, 1024, 1024], 1)
    x = conv_block(x, (1, 1), [256, 256, 1024, 1024], 1)
    # conv5_x
    x = conv_block(x, (1, 1), [512, 512, 2048, 2048], 1, True)
    x = conv_block(x, (1, 1), [512, 512, 2048, 2048], 1)
    x = conv_block(x, (1, 1), [512, 512, 2048, 2048], 1)

    return tf.keras.Model(input_tensor, x)