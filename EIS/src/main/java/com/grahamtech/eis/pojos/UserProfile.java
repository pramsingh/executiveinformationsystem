package com.grahamtech.eis.pojos;

import java.util.Date;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
//import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import com.grahamtech.eis.pojos.Role;

@Entity
@Table(name = "user_profiles")
@Access(AccessType.FIELD)
public class UserProfile implements java.io.Serializable {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_profile_id", updatable = false, nullable = false)
  private long user_profile_id;
  @Column(name = "email")
  private String email;
  @Column(name = "login_status")
  private String login_status;
  @Column(name = "first_name")
  private String first_name;
  @Column(name = "middle_name")
  private String middle_name;
  @Column(name = "last_name")
  private String last_name;
  @Column(name = "job_title")
  private String job_title;
  @Column(name = "org_details")
  private String org_details;
  @Column(name = "phone")
  private String phone;
  @Column(name = "registration_project_association_request")
  private String registration_project_association_request;
  @Column(name = "system_access_justification")
  private String system_access_justification;
  @Column(name = "profile_expires_on", columnDefinition = "DATETIME")
  @Temporal(TemporalType.TIMESTAMP)
  @JsonSerialize(using = DateSerializer.class)
  private Date profile_expires_on;
  @Column(name = "lock_account_until", columnDefinition = "DATETIME")
  @Temporal(TemporalType.TIMESTAMP)
  @JsonSerialize(using = DateSerializer.class)
  private Date lock_account_until;
  @Column(name = "pwd_hash")
  private String pwd_hash;
  @Column(name = "pwd_salt")
  private String pwd_salt;
  @Column(name = "password_failure_count")
  private int password_failure_count;
  @Column(name = "challenge_question_failure_count")
  private int challenge_question_failure_count;
  @Column(name = "challenge_question_one")
  private String challenge_question_one;
  @Column(name = "challenge_question_one_answer")
  private String challenge_question_one_answer;
  @Column(name = "challenge_question_two")
  private String challenge_question_two;
  @Column(name = "challenge_question_two_answer")
  private String challenge_question_two_answer;
  @Column(name = "challenge_question_three")
  private String challenge_question_three;
  @Column(name = "challenge_question_three_answer")
  private String challenge_question_three_answer;
  @Column(name = "notification_frequency")
  @Enumerated(EnumType.STRING)
  // @JsonSerialize(using = NotificationFrequencyEnumJsonSerializer.class)
  private NotificationFrequencyEnum notification_frequency;

  @ManyToOne
  @JoinColumn(name = "role_fk_profile")
  private Role role;

  // @ManyToMany
  // @JoinTable(name="users_roles",joinColumns=@JoinColumn(name =
  // "user_profile_fk"),
  // inverseJoinColumns=@JoinColumn(name = "role_fk"))
  // @JsonManagedReference
  // private Set<Role> roles = new HashSet<Role>();

  @ManyToOne
  @JoinColumn(name = "risk_preference_fk")
  private RiskPreference riskPreference;

  @OneToMany(mappedBy = "userProfileAttribute", fetch = FetchType.EAGER, targetEntity = Project.class)
  @JsonManagedReference
  private Set<Project> userProjectSet;

  public UserProfile() {
    // default constructor
  }

  public UserProfile(String email) {
    this.email = email;
  }

  // public UserProfile(String email, Set<Role> roleSet) {
  // // this.user_profile_id = 0; // DB generated
  // this.email = email;
  // this.roleSet = roleSet;
  // }

  // public GrantedAuthority[] getAuthorities() {
  // List<GrantedAuthorityImpl> list = new ArrayList<GrantedAuthorityImpl>(0);
  // for (Role role : roles) {
  // list.add(new GrantedAuthorityImpl(role.getRole()));
  // }
  // return (GrantedAuthority[]) list.toArray(new
  // GrantedAuthority[list.size()]);
  // }

  public String getFirst_name() {
    return first_name;
  }

  public void setFirst_name(String first_name) {
    this.first_name = first_name;
  }

  public String getMiddle_name() {
    return middle_name;
  }

  public void setMiddle_name(String middle_name) {
    this.middle_name = middle_name;
  }

  public String getLast_name() {
    return last_name;
  }

  public void setLast_name(String last_name) {
    this.last_name = last_name;
  }

  public String getJob_title() {
    return job_title;
  }

  public void setJob_title(String job_title) {
    this.job_title = job_title;
  }

  public String getOrg_details() {
    return org_details;
  }

  public void setOrg_details(String org_details) {
    this.org_details = org_details;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getRegistration_project_association_request() {
    return registration_project_association_request;
  }

  public void setRegistration_project_association_request(
      String registration_project_association_request) {
    this.registration_project_association_request =
        registration_project_association_request;
  }

  public String getSystem_access_justification() {
    return system_access_justification;
  }

  public void setSystem_access_justification(String system_access_justification) {
    this.system_access_justification = system_access_justification;
  }

  public Date getProfile_expires_on() {
    return profile_expires_on;
  }

  public void setProfile_expires_on(Date profile_expires_on) {
    this.profile_expires_on = profile_expires_on;
  }

  public Date getLock_account_until() {
    return lock_account_until;
  }

  public void setLock_account_until(Date lock_account_until) {
    this.lock_account_until = lock_account_until;
  }

  public String getPwd_hash() {
    return pwd_hash;
  }

  public void setPwd_hash(String pwd_hash) {
    this.pwd_hash = pwd_hash;
  }

  public String getPwd_salt() {
    return pwd_salt;
  }

  public void setPwd_salt(String pwd_salt) {
    this.pwd_salt = pwd_salt;
  }

  public int getPassword_failure_count() {
    return password_failure_count;
  }

  public void setPassword_failure_count(int password_failure_count) {
    this.password_failure_count = password_failure_count;
  }

  public int getChallenge_question_failure_count() {
    return challenge_question_failure_count;
  }

  public void setChallenge_question_failure_count(
      int challenge_question_failure_count) {
    this.challenge_question_failure_count = challenge_question_failure_count;
  }

  public String getChallenge_question_one() {
    return challenge_question_one;
  }

  public void setChallenge_question_one(String challenge_question_one) {
    this.challenge_question_one = challenge_question_one;
  }

  public String getChallenge_question_one_answer() {
    return challenge_question_one_answer;
  }

  public void setChallenge_question_one_answer(
      String challenge_question_one_answer) {
    this.challenge_question_one_answer = challenge_question_one_answer;
  }

  public String getChallenge_question_two() {
    return challenge_question_two;
  }

  public void setChallenge_question_two(String challenge_question_two) {
    this.challenge_question_two = challenge_question_two;
  }

  public String getChallenge_question_two_answer() {
    return challenge_question_two_answer;
  }

  public void setChallenge_question_two_answer(
      String challenge_question_two_answer) {
    this.challenge_question_two_answer = challenge_question_two_answer;
  }

  public String getChallenge_question_three() {
    return challenge_question_three;
  }

  public void setChallenge_question_three(String challenge_question_three) {
    this.challenge_question_three = challenge_question_three;
  }

  public String getChallenge_question_three_answer() {
    return challenge_question_three_answer;
  }

  public void setChallenge_question_three_answer(
      String challenge_question_three_answer) {
    this.challenge_question_three_answer = challenge_question_three_answer;
  }

  public NotificationFrequencyEnum getNotification_frequency() {
    return notification_frequency;
  }

  public void setNotification_frequency(
      NotificationFrequencyEnum notification_frequency) {
    this.notification_frequency = notification_frequency;
  }

  public RiskPreference getRiskPreference() {
    return riskPreference;
  }

  public void setRiskPreference(RiskPreference riskPreference) {
    this.riskPreference = riskPreference;
  }

  public Set<Project> getUserProjectSet() {
    return userProjectSet;
  }

  public void setUserProjectSet(Set<Project> userProjectSet) {
    this.userProjectSet = userProjectSet;
  }

  public static long getSerialversionuid() {
    return serialVersionUID;
  }

  public void setLogin_status(String login_status) {
    this.login_status = login_status;
  }

  public long getUserProfileId() {
    return user_profile_id;
  }

  public void setUserProfileId(long user_profile_id) {
    this.user_profile_id = user_profile_id;
  }

  public long getUser_profile_id() {
    return user_profile_id;
  }

  public void setUser_profile_id(long user_profile_id) {
    this.user_profile_id = user_profile_id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getLogin_status() {
    return this.login_status;
  }

  public void setLogin_status(StatusEnum login_status) {
    this.login_status = login_status.name();
  }

  // public Set<Role> getRoleSet() {
  // return roleSet;
  // }
  //
  // public void setRoleSet(Set<Role> roleSet) {
  // this.roleSet = roleSet;
  // }

  // public int getRole_fk_profile() {
  // return role_fk_profile;
  // }
  //
  // public void setRole_fk_profile(int role_fk_profile) {
  // this.role_fk_profile = role_fk_profile;
  // }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}
