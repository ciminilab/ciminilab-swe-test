import button from "images/button.svg";
import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { ControllerDataset } from "scripts/controller_dataset";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  modelSlice,
  selectBatchSizeFraction,
  selectDenseUnits,
  selectEpochs,
  selectLearningRate,
} from "store/modelSlice";

const createModel = (truncatedModel: tf.LayersModel, denseUnits: number) => {
  return tf.sequential({
    layers: [
      // Flattens the input to a vector so we can use it in a dense layer. While
      // technically a layer, this only performs a reshape (and has no training
      // parameters).
      tf.layers.flatten({
        inputShape: truncatedModel.outputs[0].shape.slice(1),
      }),
      // Layer 1.
      tf.layers.dense({
        units: denseUnits,
        activation: "relu",
        kernelInitializer: "varianceScaling",
        useBias: true,
      }),
      // Layer 2. The number of units of the last layer should correspond
      // to the number of classes we want to predict.
      tf.layers.dense({
        units: 4,
        kernelInitializer: "varianceScaling",
        useBias: false,
        activation: "softmax",
      }),
    ],
  });
};

export const TrainButton = ({
  controllerDataset,
  setModel,
  truncatedModel,
}) => {
  const dispatch = useAppDispatch();

  const [trainStatus, setTrainStatus] = useState("Train Model");

  const learningRate = useAppSelector(selectLearningRate);
  const batchSizeFraction = useAppSelector(selectBatchSizeFraction);
  const epochs = useAppSelector(selectEpochs);
  const denseUnits = useAppSelector(selectDenseUnits);

  const trainHandler = () => {
    const train = async () => {
      await tf.nextFrame();
      await tf.nextFrame();

      if (controllerDataset.xs == null) {
        throw new Error("Add some examples before training!");
      }

      if (!truncatedModel) return;

      const model = createModel(truncatedModel, denseUnits);

      // Creates the optimizers which drives training of the model.
      const optimizer = tf.train.adam(learningRate);

      // We use categoricalCrossentropy which is the loss function we use for
      // categorical classification which measures the error between our predicted
      // probability distribution over classes (probability that an input is of each
      // class), versus the label (100% probability in the true class)>
      model.compile({ optimizer: optimizer, loss: "categoricalCrossentropy" });

      // We parameterize batch size as a fraction of the entire dataset because the
      // number of examples that are collected depends on how many examples the user
      // collects. This allows us to have a flexible batch size.
      const batchSize = Math.floor(
        controllerDataset.xs.shape[0] * batchSizeFraction
      );
      if (!(batchSize > 0)) {
        throw new Error(
          `Batch size is 0 or NaN. Please choose a non-zero fraction.`
        );
      }

      // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
      model.fit(controllerDataset.xs, controllerDataset.ys, {
        batchSize,
        epochs: epochs,
        callbacks: {
          onBatchEnd: async (batch, logs) => {
            setTrainStatus("Loss: " + logs?.loss.toFixed(5));
          },
        },
      });

      setModel(model);
    };

    dispatch(modelSlice.actions.setPredicting(false));
    setTrainStatus("Training...");
    train().catch((err) => {
      console.log(err);
    });
  };

  return (
    <button id="train" onClick={trainHandler}>
      <img width="66" height="66" alt="train button" src={button} />
      <span id="train-status">{trainStatus}</span>
    </button>
  );
};
