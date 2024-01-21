<script>
  import { dayString } from "../teststring";
</script>

<div class="test">
  {@html dayString}
</div>

<style lang="scss">
  h2 {
    color: red;
  }
  @media print {
    div {
      background-color: white;
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      margin: 0;
      padding: 15px;
      font-size: 14px;
      line-height: 18px;
      color: black;
      visibility: visible;
      & > h2 {
        color: red;
      }
    }
  }
</style>
