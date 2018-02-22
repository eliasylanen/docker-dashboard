export interface Container {
  id: string;
  name: string;
  image: string;
  state: string;
  status: string;
}

export interface ContainerList {
  containers: Array<Container>;
  title?: string;
}

export interface ModalProperties {
  id: string;
  title?: string;
  buttonText?: string;
  onButtonClicked?: () => boolean | undefined;
  onRunImage?: (name: string) => void;
  isValid?: boolean;
}
