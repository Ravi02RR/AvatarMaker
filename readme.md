# Avatar Image API

This API generates an avatar image with specified name.

## Endpoints

### `/avatar/:name`

- **Method**: `GET`
- **Description**: Returns an avatar image
- **URL Parameters**:

  - `name`: The name to display on the avatar.

- **Example**:
  ```bash
  GET /avatar/xyz
  ```

  **DOCKER**:
  ```bash
  docker container run -d -p YourPort:3000 ravi848101mnb/avatar-maker:0.0.1.RELEASE
  ```
