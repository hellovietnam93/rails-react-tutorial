import ReactOnRails from 'react-on-rails';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import StaticPagesShowBox from
  '../components/static_pages/static_pages_show_box';
import SignInBox from '../components/sessions/sign_in_box';
import SignUpBox from '../components/users/sign_up_box';
import UserShowBox from '../components/users/user_show_box';
import UserEditBox from '../components/users/edit_box';
import PostBox from '../components/posts/box';

ReactOnRails.register({
  Header,
  Footer,
  StaticPagesShowBox,
  SignInBox,
  SignUpBox,
  UserShowBox,
  UserEditBox,
  PostBox,
});
